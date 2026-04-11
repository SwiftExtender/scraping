package main

import (
	"encoding/base64"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"
	"runtime"
	"strconv"
	"strings"
	"time"

	"github.com/google/uuid"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

type CommandRecord struct {
	ID      int    `json:"id"`
	Pid     int    `json:"pid"`
	Cli     string `json:"cli"`
	StartTime time.Time `json:"startTime"`
	EndTime   time.Time `json:"endTime,omitempty"`
	ExitCode  int       `json:"exitCode,omitempty"`
	Stdout    string    `json:"stdout,omitempty"`
	Stderr    string    `json:"stderr,omitempty"`
}

var (
	db         *gorm.DB
	appToken   string
)

const envPath = ".env"

func loadAppToken() error {
	if _, err := os.Stat(envPath); os.IsNotExist(err) {
		token := generateRandomToken()
		appToken = token
		return os.WriteFile(envPath, []byte(token), 0644)
	}

	data, err := os.ReadFile(envPath)
	if err != nil {
		return err
	}
	appToken = strings.TrimSpace(string(data))
	return nil
}

func generateRandomToken() (string) {
	s := uuid.New()
	return s.String()
}

func connectDB() (*gorm.DB, error) {
	return gorm.Open(sqlite.Open("data.db"), &gorm.Config{})
}

func verifyToken(r *http.Request) bool {
	tok := r.Header.Get("NFToken")
	return tok == appToken
}

// POST /health
func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	io.WriteString(w, `"ok"`)
}

// GET /history
func historyHandler(w http.ResponseWriter, r *http.Request) {
	if !verifyToken(r) {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}
	var entries []CommandRecord
	res := db.Find(&entries)
	if res.Error != nil {
    	http.Error(w, res.Error.Error(), http.StatusInternalServerError)
    	return
	}

// entries is now populated; send it as JSON
writeJSON(w, entries)
}

// GET /stop/{pid}
func stopHandler(w http.ResponseWriter, r *http.Request) {
	if !verifyToken(r) {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	pidStr := strings.TrimPrefix(r.URL.Path, "/stop/")
	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		http.Error(w, "invalid pid", http.StatusBadRequest)
		return
	}

	// Attempt to find and kill on this machine
	cmd := exec.Command("kill", "-9", strconv.Itoa(pid)) // Linux/macOS
	if runtime.GOOS == "windows" {
		cmd = exec.Command("taskkill", "/PID", strconv.Itoa(pid))
	}

	err = cmd.Run()
	if err != nil && !strings.Contains(err.Error(), "no such process") &&
		!strings.Contains(err.Error(), "The process with PID") &&
		!strings.Contains(err.Error(), "not exist") {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	writeJSON(w, pid)
}

// GET /pid/{pid}
func pidHandler(w http.ResponseWriter, r *http.Request) {
	if !verifyToken(r) {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	pidStr := strings.TrimPrefix(r.URL.Path, "/pid/")
	pid, err := strconv.Atoi(pidStr)
	if err != nil {
		http.Error(w, "invalid pid", http.StatusBadRequest)
		return
	}

	// Quick existence check – no universal portable API, but we can try `ps`
	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		cmd = exec.Command("tasklist", "/FI", "PID eq "+strconv.Itoa(pid))
	} else {
		cmd = exec.Command("ps", "-p", strconv.Itoa(pid))
	}

	out, err := cmd.CombinedOutput()
	alive := err == nil && len(bytesTrim(out)) > 0

	if !alive {
		http.NotFound(w, r)
		return
	}

	writeJSON(w, true)
}

func bytesTrim(b []byte) []byte {
	s := strings.TrimSpace(string(b))
	return []byte(s)
}

// GET /launch/{command}
func launchHandler(w http.ResponseWriter, r *http.Request) {
	if !verifyToken(r) {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	commandB64 := strings.TrimPrefix(r.URL.Path, "/launch/")
	commandB64 = r.URL.RawQuery // treat query as command (e.g., /launch?Y21kIGlwY29uZmln)
	if commandB64 == "" {
		http.Error(w, "missing query", http.StatusBadRequest)
		return
	}

	// Decode base64 command
	data, err := base64.StdEncoding.DecodeString(commandB64)
	if err != nil {
		http.Error(w, "invalid input", http.StatusBadRequest)
		return
	}
	realCmd := string(data)

	// Decide shell
	var cmd *exec.Cmd
	if runtime.GOOS == "windows" {
		cmd = exec.Command("powershell.exe", "-Command", realCmd)
	} else {
		cmd = exec.Command("bash", "-c", realCmd)
	}

	// Capture stdout/stderr
	var stdout, stderr strings.Builder
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err = cmd.Start()
	if err != nil {
		writeJSON(w, 0)
		return
	}
	var rec CommandRecord
	rec.Pid = cmd.Process.Pid
	rec.Cli = realCmd
	rec.StartTime =  time.Now().UTC()
	insertRes := db.Create(&rec)
	if insertRes.Error != nil {
		log.Printf("Create error: %v", insertRes.Error)
		return
	}
	
	done := make(chan error, 1)
	go func() {
		done <- cmd.Wait()
	}()

	const timeoutSec = 10
	select {
	case err := <-done:
		if err != nil {
			if exitError, ok := err.(*exec.ExitError); ok {
				db.Model(&rec).Update("ExitCode", exitError.ExitCode())
			} else {
				db.Model(&rec).Update("ExitCode", 255)
			}
		}
	case <-time.After(timeoutSec * time.Second):
		cmd.Process.Kill()
		db.Model(&rec).Update("ExitCode", 255)
	}

	db.Model(&rec).Update("EndTime", time.Now().UTC())
	writeJSON(w, map[string]interface{}{"id": rec.Pid})
}

// GET /result/{id}
func resultHandler(w http.ResponseWriter, r *http.Request) {
	if !verifyToken(r) {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	idStr := strings.TrimPrefix(r.URL.Path, "/result/")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "invalid id", http.StatusBadRequest)
		return
	}
	var rec CommandRecord
	db.First(&rec, id)
	writeJSON(w, rec)
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(v); err != nil {
		log.Printf("JSON encode: %v", err)
	}
}

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)

	// Load token
	if err := loadAppToken(); err != nil {
		log.Fatalf("loadAppToken: %v", err)
	}

	// Connect DB
	var err error
	db, err = connectDB()
	if err != nil {
		log.Fatalf("connectDB: %v", err)
	}

	// Run migration
	if err = db.AutoMigrate(&CommandRecord{}); err != nil {
		log.Fatalf("Migrerror: %v", err)
	}
	// Routes
	mux := http.NewServeMux()
	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("/history", historyHandler)
	mux.HandleFunc("/stop/", stopHandler)
	mux.HandleFunc("/pid/", pidHandler)
	mux.HandleFunc("/launch/", launchHandler)
	mux.HandleFunc("/result/", resultHandler)

	log.Println("server starting on http://0.0.0.0:10001")
	log.Fatal(http.ListenAndServe(":10001", mux))
}

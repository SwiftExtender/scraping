#!/usr/bin/env python3
"""
heur_rtp.py — heuristic RTP analyzer + extractor.

No SDP required. Detects RTP flows, identifies codec by payload-pattern
scoring (H.264 / H.265 / MP4V-ES / JPEG-RFC2435 / raw JPEG), reports
byte-level diagnostics, and extracts each stream in every plausible
interpretation so you can see what actually decodes.

Usage:
    python heur_rtp.py dump
    python heur_rtp.py dump --extract --frames
"""
import argparse, os, re, shutil, subprocess, sys
from collections import Counter, defaultdict

try:
    from scapy.all import PcapNgReader, PcapReader, IP, UDP, TCP
except ImportError:
    sys.exit("pip install scapy")


# ============================================================ pcap I/O
def iter_pkts(path):
    r = None
    try:
        try: r = PcapNgReader(path)
        except Exception: r = PcapReader(path)
        for p in r: yield p
    finally:
        if r is not None: r.close()


# ============================================================ RTP collection
def parse_rtp(p):
    if len(p) < 13: return None
    if (p[0] >> 6) != 2: return None
    cc = p[0] & 0x0F
    ext = p[0] & 0x10
    pad = p[0] & 0x20
    pt  = p[1] & 0x7F
    seq = (p[2] << 8) | p[3]
    ts  = int.from_bytes(p[4:8], "big")
    ssrc = int.from_bytes(p[8:12], "big")
    if ssrc == 0: return None
    off = 12 + cc * 4
    if ext:
        if off + 4 > len(p): return None
        off += 4 + ((p[off + 2] << 8) | p[off + 3]) * 4
    end = len(p) - (p[-1] if pad else 0)
    if off >= end: return None
    return seq, ts, ssrc, pt, p[off:end]


def collect_rtp(path, rtsp_ports=(554,)):
    flows = defaultdict(list)
    seen = set()
    tcp_bufs = defaultdict(bytes)
    for pkt in iter_pkts(path):
        if IP not in pkt: continue
        if UDP in pkt:
            r = parse_rtp(bytes(pkt[UDP].payload))
            if r:
                _, _, ssrc, _, _ = r
                key = (ssrc, r[0], r[1])
                if key not in seen:
                    seen.add(key)
                    flows[ssrc].append((r[0], r[1], r[4], r[3]))
        elif TCP in pkt:
            t = pkt[TCP]
            if t.sport not in rtsp_ports and t.dport not in rtsp_ports: continue
            k = (pkt[IP].src, t.sport, pkt[IP].dst, t.dport)
            tcp_bufs[k] += bytes(t.payload)
            while True:
                buf = tcp_bufs[k]
                if len(buf) < 2: break
                if buf[0] == 0x24:
                    if len(buf) < 4: break
                    ln = (buf[2] << 8) | buf[3]
                    if len(buf) < 4 + ln: break
                    payload = buf[4:4+ln]
                    tcp_bufs[k] = buf[4+ln:]
                    r = parse_rtp(payload)
                    if r:
                        _, _, ssrc, _, _ = r
                        key = (ssrc, r[0], r[1])
                        if key not in seen:
                            seen.add(key)
                            flows[ssrc].append((r[0], r[1], r[4], r[3]))
                else:
                    i = buf.find(b"\r\n\r\n")
                    if i < 0: break
                    hdr = buf[:i].decode("utf-8", "replace")
                    rest = buf[i+4:]
                    m = re.search(r"Content-Length:\s*(\d+)", hdr, re.I)
                    cl = int(m.group(1)) if m else 0
                    if len(rest) < cl: break
                    tcp_bufs[k] = rest[cl:]
    return flows


# ============================================================ analysis
def analyze_payloads(payloads):
    """Deep per-stream analysis with proper validation."""
    a = {
        "first_bytes": Counter(),
        "second_bytes": Counter(),
        "h264_types_valid": Counter(),
        "h264_types_naive": Counter(),
        "h265_types_valid": Counter(),
        "h264_invalid_f1": 0,
        "h265_invalid": 0,
        "mp4v_hits": 0,
        "jpeg_hits": 0,
        "rfc2435_hits": 0,
    }
    for p in payloads:
        if not p: continue
        b0 = p[0]; b1 = p[1] if len(p) > 1 else 0
        a["first_bytes"][b0] += 1
        if len(p) > 1: a["second_bytes"][b1] += 1

        # H.264 (proper): F=0, type in 1..23/24/28
        a["h264_types_naive"][b0 & 0x1F] += 1
        if (b0 & 0x80) == 0:
            t = b0 & 0x1F
            if t in (1,5,6,7,8,9,24,28):
                a["h264_types_valid"][t] += 1
        else:
            a["h264_invalid_f1"] += 1

        # H.265 (proper): F=0, tid in 1..7, layer_id == 0 (typical)
        if len(p) >= 2:
            if (b0 & 0x80) == 0:
                h265_t   = (b0 >> 1) & 0x3F
                tid      = b1 & 0x07
                layer_id = ((b0 & 0x01) << 5) | (b1 >> 3)
                if h265_t <= 49 and tid > 0 and layer_id == 0:
                    a["h265_types_valid"][h265_t] += 1
                else:
                    a["h265_invalid"] += 1

        # MP4V-ES VOP start code
        if len(p) >= 5 and p[0] == 0 and p[1] == 0 and p[2] == 1 and p[3] in (0xB0,0xB5,0xB6):
            a["mp4v_hits"] += 1
        if b0 == 0xFF and b1 == 0xD8:
            a["jpeg_hits"] += 1
        if len(p) >= 10 and p[8] == 0xFF and p[9] == 0xD8:
            a["rfc2435_hits"] += 1
    return a


def identify_codec(a, n):
    """Score codecs and pick the best."""
    scores = {
        "H264":        a["h264_types_valid"].total(),
        "H265":        a["h265_types_valid"].total(),
        "MP4V-ES":     a["mp4v_hits"],
        "RFC2435":     a["rfc2435_hits"],
        "JPEG-raw":    a["jpeg_hits"],
    }
    if not n: return None, scores
    best, cnt = max(scores.items(), key=lambda kv: kv[1])
    if cnt / n < 0.4:
        return None, scores
    return best, scores


# ============================================================ depacketizers
def sort_pkts(pkts):
    if not pkts: return pkts
    ref = pkts[0][0]
    def key(p):
        d = (p[0] - ref) & 0xFFFF
        return d - 0x10000 if d >= 0x8000 else d
    return sorted(pkts, key=key)


def depack_h264(pkts, sps_pps=None):
    out = bytearray()
    for n in sps_pps or []: out += b"\x00\x00\x00\x01" + n
    fu = None
    for _, _, p, _ in sort_pkts(pkts):
        if not p or (p[0] & 0x80) != 0: continue   # skip invalid F=1
        t = p[0] & 0x1F
        if 1 <= t <= 23:
            out += b"\x00\x00\x00\x01" + p
        elif t == 24:
            i = 1
            while i + 2 <= len(p):
                sz = (p[i] << 8) | p[i+1]; i += 2
                if i + sz > len(p): break
                out += b"\x00\x00\x00\x01" + p[i:i+sz]; i += sz
        elif t == 28:
            if len(p) < 3: continue
            h = p[1]
            s, e, f = h & 0x80, h & 0x40, h & 0x1F
            if s: fu = bytearray([(p[0] & 0xE0) | f]) + p[2:]
            elif fu is not None: fu += p[2:]
            if e and fu is not None:
                out += b"\x00\x00\x00\x01" + bytes(fu); fu = None
    return bytes(out)


def depack_h265(pkts, params=None):
    out = bytearray()
    for n in params or []: out += b"\x00\x00\x00\x01" + n
    fu = None
    for _, _, p, _ in sort_pkts(pkts):
        if len(p) < 2 or (p[0] & 0x80) != 0: continue
        t = (p[0] >> 1) & 0x3F
        if t <= 47:
            out += b"\x00\x00\x00\x01" + p
        elif t == 48:
            i = 2
            while i + 2 <= len(p):
                sz = (p[i] << 8) | p[i+1]; i += 2
                if i + sz > len(p): break
                out += b"\x00\x00\x00\x01" + p[i:i+sz]; i += sz
        elif t == 49:
            if len(p) < 4: continue
            h = p[2]
            s, e, f = h & 0x80, h & 0x40, h & 0x3F
            if s:
                nh = bytearray(p[0:2])
                nh[0] = (nh[0] & 0x81) | (f << 1)
                fu = nh + p[3:]
            elif fu is not None: fu += p[3:]
            if e and fu is not None:
                out += b"\x00\x00\x00\x01" + bytes(fu); fu = None
    return bytes(out)


def depack_mp4v(pkts):
    return b"".join(p for _, _, p, _ in sort_pkts(pkts) if p)


def extract_jpeg(pkts):
    """RFC 2435 reassembly by (ts, fragment offset)."""
    frames = defaultdict(lambda: {"parts": {}, "type": 0, "q": 0})
    for _, ts, p, _ in pkts:
        if len(p) < 8: continue
        offset = (p[4] << 16) | (p[5] << 8) | p[6]
        frames[ts]["parts"][offset] = p[8:]
        frames[ts]["type"] = p[0]
        frames[ts]["q"] = p[1]
    return [(ts, b"".join(f["parts"][o] for o in sorted(f["parts"])))
            for ts, f in frames.items()]


def find_params(payloads, codec):
    """Scan RTP payloads for SPS/PPS/VPS (H.264/H.265) and IDR count."""
    r = {"sps": None, "pps": None, "vps": None, "idr": 0}
    for p in payloads:
        if not p: continue
        if codec == "H264":
            if (p[0] & 0x80) != 0: continue
            t = p[0] & 0x1F
            nals = []
            if 1 <= t <= 23: nals.append(p)
            elif t == 24:
                i = 1
                while i + 2 <= len(p):
                    sz = (p[i] << 8) | p[i+1]; i += 2
                    if i + sz > len(p): break
                    nals.append(p[i:i+sz]); i += sz
            for n in nals:
                if not n: continue
                nt = n[0] & 0x1F
                if nt == 7 and not r["sps"]: r["sps"] = n
                elif nt == 8 and not r["pps"]: r["pps"] = n
                elif nt == 5: r["idr"] += 1
        elif codec == "H265":
            if len(p) < 2 or (p[0] & 0x80) != 0: continue
            t = (p[0] >> 1) & 0x3F
            nals = []
            if t <= 47: nals.append(p)
            elif t == 48:
                i = 2
                while i + 2 <= len(p):
                    sz = (p[i] << 8) | p[i+1]; i += 2
                    if i + sz > len(p): break
                    nals.append(p[i:i+sz]); i += sz
            for n in nals:
                if len(n) < 2: continue
                nt = (n[0] >> 1) & 0x3F
                if nt == 32 and not r["vps"]: r["vps"] = n
                elif nt == 33 and not r["sps"]: r["sps"] = n
                elif nt == 34 and not r["pps"]: r["pps"] = n
                elif nt in (19, 20, 21): r["idr"] += 1
    return r


def nal_hist(data, codec):
    c = Counter()
    i = 0
    while True:
        if data[i:i+4] == b"\x00\x00\x00\x01": hdr = i + 4
        elif data[i:i+3] == b"\x00\x00\x01":   hdr = i + 3
        else:
            i += 1
            if i >= len(data) - 3: break
            continue
        if hdr >= len(data): break
        b = data[hdr]
        if (b & 0x80) == 0:
            if codec == "H264": c[b & 0x1F] += 1
            else:               c[(b >> 1) & 0x3F] += 1
        i = hdr + 1
    return c


# ============================================================ ffmpeg
def ffmpeg_try(args, timeout=180):
    if not shutil.which("ffmpeg"):
        return False, "ffmpeg not on PATH"
    try:
        r = subprocess.run(args, capture_output=True, timeout=timeout)
        return r.returncode == 0, r.stderr.decode("utf-8", "replace")[-400:]
    except Exception as e:
        return False, str(e)


# ============================================================ main
def fu_breakdown(payloads):
    """Count FU-A S/E flags to diagnose incomplete IDRs."""
    c = {"start": 0, "middle": 0, "end": 0, "single": 0}
    for p in payloads:
        if not p or (p[0] & 0x80) != 0: continue
        if (p[0] & 0x1F) != 28 or len(p) < 3: continue
        h = p[1]
        s, e = bool(h & 0x80), bool(h & 0x40)
        if s and e: c["single"] += 1
        elif s:     c["start"]  += 1
        elif e:     c["end"]    += 1
        else:       c["middle"] += 1
    return c

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pcap")
    ap.add_argument("--out-dir", default="heur_out")
    ap.add_argument("--extract", action="store_true")
    ap.add_argument("--frames", action="store_true")
    ap.add_argument("--fps", type=float, default=25.0)
    ap.add_argument("--min-packets", type=int, default=2)
    ap.add_argument("--min-bytes", type=int, default=50,
                    help="min bytes to attempt decode (default 50)")
    args = ap.parse_args()

    print(f"[*] reading {args.pcap} ...")
    flows = collect_rtp(args.pcap)
    if not flows:
        sys.exit("[!] No RTP flows detected.")

    ranked = sorted(flows.items(), key=lambda kv: -sum(len(p[2]) for p in kv[1]))
    print(f"[+] {len(ranked)} RTP flow(s):\n")

    for ssrc, pkts in ranked:
        n = len(pkts)
        nbytes = sum(len(p[2]) for p in pkts)
        pts = sorted({p[3] for p in pkts})
        payloads = [p[2] for p in pkts]

        print("─" * 72)
        print(f"SSRC 0x{ssrc:08x} | {n} pkts | {nbytes} B | PT={pts}")
        if n < args.min_packets:
            print("  (too few packets)")
            continue

        a = analyze_payloads(payloads)
        codec, scores = identify_codec(a, n)

        print(f"  first-byte hist  : "
              f"{[(hex(b), c) for b, c in a['first_bytes'].most_common(6)]}")
        print(f"  2nd-byte hist    : "
              f"{[(hex(b), c) for b, c in a['second_bytes'].most_common(4)]}")
        print(f"  H.264 type hist  : {dict(a['h264_types_valid'].most_common(8))}")
        print(f"  H.265 type hist  : {dict(a['h265_types_valid'].most_common(8))}")
        if a['h264_invalid_f1']:
            print(f"  H.264 F=1 bytes  : {a['h264_invalid_f1']}")
        print(f"  codec scores     : {scores}")

        # FU-A diagnostics — always shown
        fb = fu_breakdown(payloads)
        if sum(fb.values()) > 0:
            print(f"  FU-A breakdown   : {fb}")
            if fb["middle"] and not fb["start"] and not fb["single"]:
                print(f"  ⚠  ALL FU-A are middles → IDR started before capture")
            elif fb["start"] and not fb["end"] and not fb["single"]:
                print(f"  ⚠  IDR starts but never ends → capture too short")

        if not codec:
            print(f"  [?] low confidence — trying both H.264 and H.265")
            candidates = ["H264", "H265"]
        else:
            print(f"  [+] best guess   : {codec}")
            candidates = [codec]
            if codec == "H264": candidates.append("H265")
            if codec == "H265": candidates.append("H264")

        if not args.extract:
            continue

        os.makedirs(args.out_dir, exist_ok=True)
        base = os.path.join(args.out_dir, f"ssrc_{ssrc:08x}")

        # JPEG / MP4V special paths
        if "JPEG" in candidates[0] or a["rfc2435_hits"] > n * 0.4:
            frames = extract_jpeg(pkts)
            if frames:
                jdir = base + "_frames"
                os.makedirs(jdir, exist_ok=True)
                for i, (ts, data) in enumerate(frames):
                    with open(os.path.join(jdir, f"frame_{i:05d}.jpg"), "wb") as f:
                        f.write(data)
                print(f"  -> {len(frames)} JPEG frames in {jdir}/")
                continue

        if a["mp4v_hits"] > n * 0.4:
            data = depack_mp4v(pkts)
            raw = base + ".m4v"
            with open(raw, "wb") as f: f.write(data)
            print(f"  -> {raw} ({len(data)} B, MP4V-ES)")
            mp4 = base + ".mp4"
            ok, _ = ffmpeg_try(["ffmpeg", "-y", "-r", str(args.fps),
                                "-f", "m4v", "-i", raw, "-c:v", "copy", mp4])
            if ok: print(f"  -> {mp4}")
            continue

        # ---- try each candidate codec, ALWAYS produce diagnostics ----
        attempts = []
        for codec_name in candidates:
            if codec_name == "H264":
                params = find_params(payloads, "H264")
                sps_pps = [b for b in (params["sps"], params["pps"]) if b]
                data = depack_h264(pkts, sps_pps)
                ext, fmt = "h264", "h264"
                hist = nal_hist(data, "H264")
                info = (f"SPS={'Y' if params['sps'] else 'N'} "
                        f"PPS={'Y' if params['pps'] else 'N'} "
                        f"IDR={params['idr']}")
            else:
                params = find_params(payloads, "H265")
                ps = [b for b in (params["vps"], params["sps"], params["pps"]) if b]
                data = depack_h265(pkts, ps)
                ext, fmt = "h265", "hevc"
                hist = nal_hist(data, "H265")
                info = (f"VPS={'Y' if params['vps'] else 'N'} "
                        f"SPS={'Y' if params['sps'] else 'N'} "
                        f"PPS={'Y' if params['pps'] else 'N'} "
                        f"IDR={params['idr']}")

            raw = f"{base}_{codec_name.lower()}.{ext}"
            with open(raw, "wb") as f: f.write(data)
            print(f"  [{codec_name}] {len(data)} B | {info} | "
                  f"NAL hist={dict(hist.most_common(8))}")

            ok = False
            stderr = ""
            if len(data) >= args.min_bytes:
                try:
                    r = subprocess.run(
                        ["ffmpeg", "-v", "error", "-f", fmt,
                         "-i", raw, "-f", "null", "-"],
                        capture_output=True, timeout=45)
                    stderr = r.stderr.decode("utf-8", "replace").strip()
                    ok = r.returncode == 0 and stderr == ""
                except Exception as e:
                    stderr = str(e)
            else:
                stderr = f"data too small ({len(data)} B < {args.min_bytes})"

            attempts.append({
                "codec": codec_name, "raw": raw, "fmt": fmt,
                "ok": ok, "stderr": stderr, "size": len(data),
                "has_params": bool(params["sps"] if codec_name == "H264"
                                   else params["sps"]),
                "has_idr": params["idr"] > 0,
            })

        if not attempts:
            print(f"  [✗] no codec produced output")
            continue

        ok_attempts = [x for x in attempts if x["ok"]]

        if ok_attempts:
            chosen = ok_attempts[0]
            print(f"  [+] decoded OK as {chosen['codec']}")
        else:
            best = max(attempts, key=lambda x: (x["size"], x["has_params"]))
            print(f"  [!] no codec decoded cleanly; best={best['codec']} "
                  f"({best['size']} B, SPS={'Y' if best['has_params'] else 'N'}, "
                  f"IDR={'Y' if best['has_idr'] else 'N'})")
            if best["stderr"]:
                for line in best["stderr"].splitlines()[:4]:
                    print(f"       {line}")
            print(f"  → nothing decodable in this flow")

            # explain exactly what's missing
            fb = fu_breakdown(payloads)
            any_sps = any(x["has_params"] for x in attempts)
            any_idr = any(x["has_idr"] for x in attempts)
            probs = []
            if not any_sps:
                probs.append("missing SPS/PPS (parameter sets)")
            if not any_idr:
                probs.append("missing IDR keyframe")
            if fb["middle"] > 0 and fb["start"] == 0 and fb["single"] == 0:
                probs.append("IDR was started before capture began")
            if probs:
                print(f"     problems: {'; '.join(probs)}")
            print(f"     → recapture with the RTSP client connecting from scratch:")
            print(f"       tshark -i <iface> -f \"host <camera-ip>\" -w new.pcapng")
            print(f"       (open VLC fresh, play 30 s, close, Ctrl-C tshark)")
            continue

        # ---- decode succeeded, mux + frames ----
        chosen = ok_attempts[0]
        mp4 = base + ".mp4"
        ok, _ = ffmpeg_try(["ffmpeg", "-y", "-fflags", "+genpts+discardcorrupt",
                            "-err_detect", "ignore_err", "-r", str(args.fps),
                            "-f", chosen["fmt"], "-i", chosen["raw"],
                            "-c:v", "copy", mp4])
        if ok:
            print(f"  -> {mp4}")
        if args.frames and ok:
            fdir = base + "_frames"
            os.makedirs(fdir, exist_ok=True)
            ok, _ = ffmpeg_try(["ffmpeg", "-y", "-fflags", "+genpts+discardcorrupt",
                                "-err_detect", "ignore_err", "-r", str(args.fps),
                                "-i", mp4, os.path.join(fdir, "frame_%05d.png")])
            if ok: print(f"  -> {fdir}/")

    print("\n" + "─" * 72)
    print("done.")


if __name__ == "__main__":
    main()


if __name__ == "__main__":
    main()

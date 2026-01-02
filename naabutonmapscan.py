#convert naabu output and scan by nmap
import subprocess
import sys

with open(sys.argv[1], 'r') as f:
    lines = f.readlines()

# Group ports by host
host_ports = {}
for line in lines:
    line = line.strip()
    if ':' in line:
        host, port = line.split(':', 1)
        if host not in host_ports:
            host_ports[host] = []
        host_ports[host].append(port)

# Scan each host with its specific ports
for host, ports in host_ports.items():
    port_list = ','.join(sorted(set(ports)))
    cmd = ['nmap', '-Pn','-sC', '-sV', '--append-output', '-oN', 'test111.txt', '-p', port_list, host]
    print(f"Running: {' '.join(cmd)}")
    subprocess.run(cmd)

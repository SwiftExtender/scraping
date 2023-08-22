import socks  # SocksiPy module
import socket
import sys
from datetime import datetime
import html_logger

def gen_timestamp():
    return datetime.now().strftime('%d %H:%M:%S')

html_logger.setup('Tot ports results', 'tor_results.html')

SOCKS_PORT = 9050

# Set socks proxy

socks.setdefaultproxy(socks.PROXY_TYPE_SOCKS5, '127.0.0.1', SOCKS_PORT)
socket.socket = socks.socksocket

# Perform DNS resolution through the socket

def getaddrinfo(*args):
    return [(socket.AF_INET, socket.SOCK_STREAM, 6, '', (args[0], args[1]))]

socket.getaddrinfo = getaddrinfo

def check_port(h, p):
    try:
        s = socks.socksocket()
        s.settimeout(7)
        s.connect((h, p))
        message = b'GET / HTTP/1.0\r\n\r\n'
        s.sendall(message)
        res = s.recv(8192)
        success = h+":"+str(p)+" opened"
        html_logger.dbg(gen_timestamp())
        html_logger.dbg(success)
        html_logger.dbg(res)
    except Exception as e:
        err = h+":"+str(p)+" no connect"
        html_logger.dbg(gen_timestamp())
        html_logger.dbg(h+":"+str(p)+" no connect")
        html_logger.dbg(e)

onions_file = open("!assets\\onions.txt")
onions = onions_file.readlines()
onions_file.close()

for onion in onions:
    if sys.argv[1] == "list":
        ports_file = open("!assets\\ports.txt")
        ports = ports_file.readlines()
        ports_file.close()
        for port in ports:
            check_port(onion.rstrip(), int(port.rstrip()))

    elif sys.argv[1] == "all":
        for port in range(0, 65535):
            check_port(onion.rstrip(), port)

    else:
        print("Wrong option for scan")


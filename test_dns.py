from boofuzz import *
#from bitstring import BitArray
import random

def dhcp_block():
    tr_id = bytes([random.randrange(0, 256) for _ in range(2)])
    request_header = b'\x01\x00'
    question_header = b'\x00\x01'
    answer_rr = b'\x00\x00'
    authority_rr = b'\x00\x00'
    additional_rr = b'\x00\x00'
    query = b'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    request_type = b'\x00\x01'
    request_class = b'\x00\x01'
    s_initialize('DNS_request')
    s_static(tr_id)              #transaction ID
    s_static(request_header)     #request
    s_static(question_header)    #question
    s_static(answer_rr)          #answer RR
    s_static(authority_rr)       #authority RR
    s_static(additional_rr)      #additional RR
    s_bytes(b"\x01\x00", fuzzable=True)         #query
    s_static(request_type)
    s_static(request_class)
 


def main():
    session = Session(
        target=Target(
            connection=SocketConnection("192.168.0.13", 53, proto='udp')
        ),
    )
    dhcp_block()
    session.connect(s_get("DNS_request"))
    session.fuzz()


if __name__ == "__main__":
    main()
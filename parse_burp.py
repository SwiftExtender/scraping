import sys
with open(sys.argv[1], 'r') as f:
    burp_content = f.readlines()
    for b in burp_content:
        if "<url><![CDATA[" in b:
            t = b.replace(" ", "")
            print(t[14:-10])
            #break
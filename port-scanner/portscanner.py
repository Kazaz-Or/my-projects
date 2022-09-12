import pyfiglet
import sys
import socket
from datetime import datetime

ascii_banner = pyfiglet.figlet_format("PORT SCANNER")
print(ascii_banner)

max_port = int(input("Please write the maximum port number you would like to scan\n"))

if len(sys.argv) == 2:
    target = socket.gethostbyname(sys.argv[1])
else:
    print("Invalid ammount of Arguments, you must enter the IP")


print("-" * 50)
print(f"Scanning Target IP: {target}")
print(f"Scanning started at: {str(datetime.now())}")
print("-" * 50)

try:
    for port in range(1, max_port + 1):
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socket.setdefaulttimeout(1)

        result = s.connect_ex((target, port))
        if result == 0:
            print("Port {} is open".format(port))
        s.close()
    print(f"Done! Scanned from port 1 to {max_port}")
except KeyboardInterrupt:
    print("\n Exitting Program")
    sys.exit()
except socket.gaierror:
    print("\n Hostname Could Not Be Resolved")
    sys.exit()
except socket.error:
    print("\n Server not responding")
    sys.exit()

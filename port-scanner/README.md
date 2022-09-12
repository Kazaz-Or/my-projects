# Python Port Scanner

This simple script let the user specify a target IP or DNS and ask for a port range to scan, while eventually returns all the open ports on the given target.

to run via cli:
```
python portscanner.py <DNS Address/IP>
```

see example output:
```
python portscanner.py github.com 
```

```
 ____   ___  ____ _____   ____   ____    _    _   _ _   _ _____ ____  
|  _ \ / _ \|  _ \_   _| / ___| / ___|  / \  | \ | | \ | | ____|  _ \ 
| |_) | | | | |_) || |   \___ \| |     / _ \ |  \| |  \| |  _| | |_) |
|  __/| |_| |  _ < | |    ___) | |___ / ___ \| |\  | |\  | |___|  _ < 
|_|    \___/|_| \_\|_|   |____/ \____/_/   \_\_| \_|_| \_|_____|_| \_\
                                                                      

Please write the maximum port number you would like to scan
443
--------------------------------------------------
Scanning Target IP: 140.82.121.3
Scanning started at: 2022-09-12 16:23:43.307995
--------------------------------------------------
Port 22 is open
Port 80 is open
Port 443 is open
Done! Scanned from port 1 to 443
```

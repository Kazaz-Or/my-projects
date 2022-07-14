<p>Simple script that checks if the passwords provided by the user have been pwned</p>
<p>Data is based on https://haveibeenpwned.com/</p>


to run via cli:
```
python checkmypass.py <password#1> <password#2>
```

see example output:
```
python checkmypass.py password123 simplepass complicatedpassnooneprobablyuses                                                                                                         [18:02:07]

password123 was found 248071 times... you should probably change your password!

simplepass was found 748 times... you should probably change your password!

complicatedpassnooneprobablyuses was NOT found.

done!
```
import os
import boto3


client = boto3.client('s3')


bucket = 'your-bucket-name'
cur_path = os.getcwd()
file = 'demo_file.svg'
filename = os.path.join(cur_path, file)

client.download_file(Bucket=bucket, Key=file, Filename=filename)

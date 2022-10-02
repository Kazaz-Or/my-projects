import os
import boto3

client = boto3.client('s3')

bucket = 'your-bucket-name'
cur_path = os.getcwd()
file = 'demo_file.svg'
filename = os.path.join(cur_path, file)

data = open(filename, 'rb')

client.upload_file(filename, bucket=bucket, file=file)

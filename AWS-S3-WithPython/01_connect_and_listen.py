from distutils.command.build import build
import boto3


client = boto3.client('s3')

response = client.list_buckets()

for b in response['Buckets']:
    print(b['Name'])

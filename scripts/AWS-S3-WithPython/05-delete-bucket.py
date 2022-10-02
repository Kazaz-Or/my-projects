import boto3


client = boto3.client('s3')

bucket = 'your-bucket-name'

response = client.list_buckets()

for n in response['Buckets']:
    print(n['Name'])


client.delete_bucket(Bucket=bucket)

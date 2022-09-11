import boto3


client = boto3.client('s3')


bucket = 'your-bucket-name'


def delete_file(filename):
    client.delete_object(Bucket=bucket, Key=filename)

from backend.core import settings
import boto3


class AWSS3Service():
  def __init__(self):
    self.s3_client = boto3.client(
      "s3",
      aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
      aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    )
  
  def upload_file(self, file, filename):
    try:
      bucket_name = settings.AWS_STORAGE_BUCKET_NAME

      self.s3_client.upload_fileobj(
          file,
          bucket_name,
          filename,
          ExtraArgs={
              "ACL": "private",
              "ContentType": file.content_type
          }
      )
      return True
    except Exception as e:
      print(e)
      return False

import boto3
from botocore.exceptions import ClientError, NoCredentialsError
from django.conf import settings


class AWSS3Service:
    EXCEL_FILE_PATH = "inventory-excels/"
    IMAGE_FILE_PATH = "vehicle-images/"

    def __init__(self):
        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )
        self.bucket_name = settings.AWS_STORAGE_BUCKET_NAME

    def __upload_file(self, file_path, file_name, file_content):
        try:
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=f"{file_path}{file_name}",
                Body=file_content,
            )
            return True
        except NoCredentialsError:
            print("Credentials not available")
            return False

    def __get_file(self, file_path, file_name):
        try:
            response = self.s3_client.get_object(
                Bucket=self.bucket_name, Key=f"{file_path}{file_name}"
            )
            return response["Body"].read()
        except ClientError as e:
            print(f"Error getting file: {e}")
            return None

    def __delete_file(self, file_path, file_name):
        try:
            self.s3_client.delete_object(
                Bucket=self.bucket_name, Key=f"{file_path}{file_name}"
            )
            return True
        except ClientError as e:
            print(f"Error deleting file: {e}")
            return False

    def upload_image(self, vehicle_id, file_name, file_content):
        vehicle_folder_path = f"{self.IMAGE_FILE_PATH}{vehicle_id}/"
        return self.__upload_file(vehicle_folder_path, file_name, file_content)

    def upload_excel_file(self, file_name, file_content):
        return self.__upload_file(self.EXCEL_FILE_PATH, file_name, file_content)

    def get_latest_excel_file(self):
        try:
            response = self.s3_client.list_objects_v2(
                Bucket=self.bucket_name, Prefix=self.EXCEL_FILE_PATH
            )

            if "Contents" in response:
                excel_files = filter(
                    lambda x: x["Key"] != self.EXCEL_FILE_PATH, response["Contents"]
                )

                latest_file_key = sorted(
                    excel_files, key=lambda x: x["LastModified"], reverse=True
                )[0]["Key"]

                return self.__get_file("", latest_file_key)
            else:
                return None
        except ClientError as e:
            print(f"Error getting latest Excel file: {e}")
            return None

    def delete_image(self, vehicle_id, file_name):
        vehicle_folder_path = f"{self.IMAGE_FILE_PATH}{vehicle_id}/"
        return self.__delete_file(vehicle_folder_path, file_name)

    def delete_excel_file(self, file_name):
        return self.__delete_file(self.EXCEL_FILE_PATH, file_name)

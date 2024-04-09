import base64
import hashlib
import hmac
import random

import boto3
from django.conf import settings


class AWSCognitoService:
    def __init__(self):
        self.client = boto3.client(
            "cognito-idp",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_S3_REGION_NAME,
        )

    def _generate_unique_bidder_number(self):
        try:
            users = self.client.list_users_in_group(
                UserPoolId=settings.COGNITO_USER_POOL_ID,
                GroupName="bidders",
            )["Users"]
            existing_numbers = []
            for user in users:
                for attr in user["Attributes"]:
                    if attr["Name"] == "custom:bidder_number":
                        existing_numbers.append(attr["Value"])
        except self.client.exceptions.ClientError as e:
            print(f"Error during user existence check: {e}")
            return None

        while True:
            number = str(random.randint(10000000, 99999999))
            if number not in existing_numbers:
                return number

    def _calculate_secret_hash(self, username):
        message = username + settings.COGNITO_APP_CLIENT_ID
        dig = hmac.new(
            settings.COGNITO_APP_CLIENT_SECRET.encode("utf-8"),
            msg=message.encode("utf-8"),
            digestmod=hashlib.sha256,
        ).digest()
        return base64.b64encode(dig).decode()

    def _map_cognito_attributes(self, attributes, is_admin=False):
        details = {attr["Name"]: attr["Value"] for attr in attributes}

        mapped = {
            "id": details.get("sub", ""),
            "email": details.get("email", ""),
            "given_name": details.get("given_name", ""),
            "family_name": details.get("family_name", ""),
        }

        if is_admin:
            mapped["permission_level"] = int(details.get("custom:permission_level", -1))
        else:
            mapped["company_name"] = details.get("custom:company_name", "")
            mapped["company_address"] = details.get("custom:company_address", "")
            mapped["phone_number"] = details.get("custom:phone_number", "")
            mapped["bidder_number"] = int(details.get("custom:bidder_number", ""))
            mapped["is_verified"] = details.get("custom:is_verified", "") == "true"
            mapped["is_blacklisted"] = (
                details.get("custom:is_blacklisted", "") == "true"
            )

        return mapped

    def create_user(self, email, password, **kwargs):
        attributes = self._prepare_user_attributes(**kwargs)
        secret_hash = self._calculate_secret_hash(email)
        try:
            response = self.client.sign_up(
                ClientId=settings.COGNITO_APP_CLIENT_ID,
                SecretHash=secret_hash,
                Username=email,
                Password=password,
                UserAttributes=attributes,
            )
            self._add_user_to_group(
                email, "admins" if kwargs.get("is_admin") else "bidders"
            )
            return response
        except self.client.exceptions.ClientError as e:
            print(f'Error creating user: {e.response["Error"]["Message"]}')
            return e.response["Error"]["Message"]

    def _prepare_user_attributes(
        self, is_admin=False, is_update=False, given_name="", family_name="", **kwargs
    ):
        attributes = [
            {"Name": "given_name", "Value": given_name},
            {"Name": "family_name", "Value": family_name},
        ]
        if is_admin:
            if kwargs["permission_level"] is not None:
                attributes.append(
                    {
                        "Name": "custom:permission_level",
                        "Value": str(kwargs.get("permission_level", "")),
                    }
                )
        else:
            if not is_update:
                bidder_number = self._generate_unique_bidder_number()
                if not bidder_number:
                    return None
                attributes.append(
                    {"Name": "custom:bidder_number", "Value": bidder_number}
                )
            attributes.extend(
                [
                    {"Name": f"custom:{key}", "Value": str(value)}
                    for key, value in kwargs.items()
                    if key != "is_admin"
                    and key != "permission_level"
                    and key != "phone_number"
                ]
            )
            if kwargs.get("phone_number") is not None:
                attributes.append(
                    {
                        "Name": "phone_number",
                        "Value": kwargs.get("phone_number"),
                    }
                )
        return attributes

    def _add_user_to_group(self, email, group_name):
        try:
            self.client.admin_add_user_to_group(
                UserPoolId=settings.COGNITO_USER_POOL_ID,
                Username=email,
                GroupName=group_name,
            )
        except self.client.exceptions.ClientError as e:
            print(f"Error adding user to group {group_name}: {e}")

    def change_password(self, access_token, previous_password, new_password):
        try:
            self.client.change_password(
                AccessToken=access_token,
                PreviousPassword=previous_password,
                ProposedPassword=new_password,
            )
            return True
        except Exception as e:
            print(f"Error changing password: {e}")
            return False

    def initiate_password_reset(self, email):
        secret_hash = self._calculate_secret_hash(email)
        try:
            self.client.forgot_password(
                ClientId=settings.COGNITO_APP_CLIENT_ID,
                Username=email,
                SecretHash=secret_hash,
            )
            return True
        except Exception as e:
            print(f"Error initiating password reset: {e}")
            return False

    def confirm_password_reset(self, email, verification_code, new_password):
        secret_hash = self._calculate_secret_hash(email)
        try:
            self.client.confirm_forgot_password(
                ClientId=settings.COGNITO_APP_CLIENT_ID,
                SecretHash=secret_hash,
                Username=email,
                ConfirmationCode=verification_code,
                Password=new_password,
            )
            return True
        except Exception as e:
            print(f"Error confirming password reset: {e}")
            return False

    def change_email(self, access_token, new_email):
        try:
            self.client.update_user_attributes(
                AccessToken=access_token,
                UserAttributes=[{"Name": "email", "Value": new_email}],
            )
            return True
        except Exception as e:
            print(f"Error changing email: {e}")
            return False

    def verify_email(self, email, verification_code):
        secret_hash = self._calculate_secret_hash(email)
        try:
            self.client.confirm_sign_up(
                ClientId=settings.COGNITO_APP_CLIENT_ID,
                Username=email,
                ConfirmationCode=verification_code,
                SecretHash=secret_hash,
                ForceAliasCreation=False,
            )
            return True
        except Exception as e:
            print(f"Error verifying email: {e}")
            return False

    def refresh_tokens(self, username, refresh_token):
        secret_hash = self._calculate_secret_hash(username)
        try:
            response = self.client.initiate_auth(
                ClientId=settings.COGNITO_APP_CLIENT_ID,
                AuthFlow="REFRESH_TOKEN_AUTH",
                AuthParameters={
                    "REFRESH_TOKEN": refresh_token,
                    "SECRET_HASH": secret_hash,
                },
            )
            return response.get("AuthenticationResult")
        except Exception as e:
            print(f"Error refreshing tokens: {e}")
            return None

    def list_users(self, is_admin=False):
        try:
            response = self.client.list_users_in_group(
                UserPoolId=settings.COGNITO_USER_POOL_ID,
                GroupName="admins" if is_admin else "bidders",
            )
            return [
                self._map_cognito_attributes(user["Attributes"], is_admin=is_admin)
                for user in response["Users"]
            ]
        except Exception as e:
            print(f"Error listing users: {e}")
            return None

    def get_user_details(self, user_id, is_admin=False):
        try:
            response = self.client.admin_get_user(
                UserPoolId=settings.COGNITO_USER_POOL_ID, Username=user_id
            )
            return self._map_cognito_attributes(
                response["UserAttributes"], is_admin=is_admin
            )
        except Exception as e:
            print(f"Error getting user details: {e}")
            return None

    def update_user(self, user_id, **kwargs):
        attributes = self._prepare_user_attributes(is_update=True, **kwargs)
        try:
            self.client.admin_update_user_attributes(
                UserPoolId=settings.COGNITO_USER_POOL_ID,
                Username=user_id,
                UserAttributes=attributes,
            )
            return True
        except Exception as e:
            print(f"Error updating user: {e}")
            return False

    def delete_user(self, user_id):
        try:
            self.client.admin_delete_user(
                UserPoolId=settings.COGNITO_USER_POOL_ID,
                Username=user_id,
            )
            return True
        except Exception as e:
            print(f"Error deleting user: {e}")
            return False

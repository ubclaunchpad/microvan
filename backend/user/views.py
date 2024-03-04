from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import IsAdminUser, IsAuthenticated
from services.AWSCognitoService import AWSCognitoService
from util.jwt import decode_token


class BidderListApiView(APIView):
    cognitoService = AWSCognitoService()

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    def get(self, request):
        """
        Return a list of all bidders.
        """
        bidders = self.cognitoService.list_users()
        return Response(bidders, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        given_name = request.data.get("given_name")
        family_name = request.data.get("family_name")
        company_address = request.data.get("company_address")
        company_name = request.data.get("company_name")
        phone_number = request.data.get("phone_number")

        if (
            not email
            or not password
            or not given_name
            or not family_name
            or not company_address
            or not company_name
            or not phone_number
        ):
            return Response(
                {"error": "Missing required fields."},
                status=status.HTTP_400_BAD_REQUEST,
            )
    
        response = self.cognitoService.create_user(
            email=email,
            password=password,
            is_admin=False,
            given_name=given_name,
            family_name=family_name,
            company_address=company_address,
            company_name=company_name,
            phone_number=phone_number,
        )

        if response and "UserSub" in response:
            return Response(
                {
                    "message": "User created successfully",
                    "userId": response["UserSub"],
                    "email": email,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {"error": response},
                status=status.HTTP_400_BAD_REQUEST,
            )


class BidderDetailApiView(APIView):
    cognitoService = AWSCognitoService()

    def get_permissions(self):
        if self.request.method == "DELETE":
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get(self, request, bidder_id):
        """
        Return a single bidder.
        """
        print("HERE")
        bidder = self.cognitoService.get_user_details(bidder_id)

        return Response(bidder, status=status.HTTP_200_OK)

    def put(self, request, bidder_id):
        """
        Update a single bidder.
        """
        given_name = request.data.get("given_name", None)
        last_name = request.data.get("last_name", None)
        company_address = request.data.get("company_address", None)
        company_name = request.data.get("company_name", None)
        phone_number = request.data.get("phone_number", None)

        self.cognitoService.update_user(
            bidder_id,
            given_name=given_name,
            last_name=last_name,
            company_address=company_address,
            company_name=company_name,
            phone_number=phone_number,
        )

        bidder = self.cognitoService.get_user_details(bidder_id)
        if bidder:
            return Response(bidder, status=status.HTTP_200_OK)

        return Response(
            {"error": "Failed to update bidder"}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, bidder_id):
        """
        Delete a single bidder.
        """
        self.cognitoService.delete_user(bidder_id)

        return Response(status=status.HTTP_204_NO_CONTENT)


class BidderVerifyApiView(APIView):
    permission_classes = [IsAdminUser]

    cognitoService = AWSCognitoService()

    def put(self, request, bidder_id):
        if "is_verified" not in request.data:
            return Response(
                {"error": "is_verified field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bidder = self.cognitoService.update_user(
            bidder_id, is_verified=request.data.get("is_verified")
        )
        if bidder:
            return Response(bidder, status=status.HTTP_200_OK)
        return Response(
            {"error": "Failed to verify bidder"}, status=status.HTTP_400_BAD_REQUEST
        )


class BidderBlacklistApiView(APIView):
    permission_classes = [IsAdminUser]

    cognitoService = AWSCognitoService()

    def put(self, request, bidder_id):
        if "is_blacklisted" not in request.data:
            return Response(
                {"error": "is_blacklisted field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bidder = self.cognitoService.update_user(
            bidder_id, is_blacklisted=request.data.get("is_blacklisted")
        )
        if bidder:
            return Response(bidder, status=status.HTTP_200_OK)
        return Response(
            {"error": "Failed to blacklist bidder"}, status=status.HTTP_400_BAD_REQUEST
        )


class AdminListApiView(APIView):
    cognitoService = AWSCognitoService()

    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    def get(self, request):
        """
        Return a list of all admins.
        """
        admins = self.cognitoService.list_users(is_admin=True)
        return Response(admins, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        given_name = request.data.get("given_name")
        family_name = request.data.get("family_name")
        permission_level = request.data.get("permission_level", 0)

        if not email or not password or not given_name or not family_name:
            return Response(
                {"error": "Missing required fields."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        response = self.cognitoService.create_user(
            email=email,
            password=password,
            is_admin=True,
            given_name=given_name,
            family_name=family_name,
            permission_level=permission_level,
        )

        if response and "UserSub" in response:
            return Response(
                {
                    "message": "User created successfully",
                    "userId": response["UserSub"],
                    "email": email,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {"error": "Failed to create user in Cognito"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class AdminDetailApiView(APIView):
    permission_classes = [IsAdminUser]

    cognitoService = AWSCognitoService()

    def get(self, request, admin_id):
        """
        Return a single admin.
        """
        admin = self.cognitoService.get_user_details(admin_id)
        return Response(admin, status=status.HTTP_200_OK)

    def put(self, request, admin_id):
        """
        Update a single admin.
        """
        permission_level = request.data.get("permission_level", None)

        admin = self.cognitoService.update_user(
            admin_id, permission_level=permission_level
        )
        if admin:
            return Response(admin, status=status.HTTP_200_OK)
        return Response(
            {"error": "Failed to update admin"}, status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, admin_id):
        """
        Delete a single admin.
        """
        self.cognitoService.delete_user(admin_id)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ListUnverified(APIView):
    permission_classes = [IsAdminUser]

    cognitoService = AWSCognitoService()

    def get(self, request):
        bidders = self.cognitoService.list_users()
        unverifiedBidders = []
        for index in range(len(bidders)):
            if bidders[index].is_verified is False:
                unverifiedBidders.append(bidders[index])
        return Response(unverifiedBidders, status=status.HTTP_200_OK)


class ListBlacklisted(APIView):
    permission_classes = [IsAdminUser]

    cognitoService = AWSCognitoService()

    def get(self, request):
        bidders = self.cognitoService.list_users()
        blacklistedBidders = []
        for index in range(len(bidders)):
            if bidders[index].is_blacklisted is True:
                blacklistedBidders.append(bidders[index])
        return Response(blacklistedBidders, status=status.HTTP_200_OK)


class ListVerified(APIView):
    permission_classes = [IsAdminUser]

    cognitoService = AWSCognitoService()

    def get(self, request):
        bidders = self.cognitoService.list_users()
        verifiedBidders = []
        for index in range(len(bidders)):
            if bidders[index].is_verified is True:
                verifiedBidders.append(bidders[index])
        return Response(verifiedBidders, status=status.HTTP_200_OK)


class LoginAPIView(APIView):
    cognitoService = AWSCognitoService()

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        is_admin = request.data.get("is_admin")

        if not email or not password or is_admin is None:
            return Response(
                {"error": "Email, password, and is_admin fields are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        auth_result = self.cognitoService.login_user(email, password)

        if auth_result:
            user_id = decode_token(auth_result.get("IdToken")).get("sub")
            user_details = self.cognitoService.get_user_details(
                user_id=user_id, is_admin=is_admin
            )
            response = Response(user_details, status=status.HTTP_200_OK)
            response.set_cookie(
                "idToken", auth_result.get("IdToken"), httponly=True, samesite="Lax"
            )
            response.set_cookie(
                "accessToken",
                auth_result.get("AccessToken"),
                httponly=True,
                samesite="Lax",
            )
            response.set_cookie(
                "refreshToken",
                auth_result.get("RefreshToken"),
                httponly=True,
                samesite="Lax",
            )
            return response
        else:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
            )


class PasswordResetAPIView(APIView):
    cognitoService = AWSCognitoService()

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        result = self.cognitoService.initiate_password_reset(email)
        if result:
            return Response(status=status.HTTP_200_OK)
        return Response(
            {"error": "Failed to initiate password reset"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class PasswordResetConfirmAPIView(APIView):
    cognitoService = AWSCognitoService()

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        verification_code = request.data.get("verification_code")
        new_password = request.data.get("new_password")
        result = self.cognitoService.confirm_password_reset(
            email, verification_code, new_password
        )
        if result:
            return Response(status=status.HTTP_200_OK)
        return Response(
            {"error": "Failed to reset password"}, status=status.HTTP_400_BAD_REQUEST
        )


class VerifyEmailAPIView(APIView):
    cognitoService = AWSCognitoService()

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        verification_code = request.data.get("verification_code")

        result = self.cognitoService.verify_email(email, verification_code)
        if result:
            return Response(
                {"success": "Email verified successfully."}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "Failed to verify email"}, status=status.HTTP_400_BAD_REQUEST
            )


class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    cognitoService = AWSCognitoService()

    def post(self, request, *args, **kwargs):
        access_token = request.data.get("access_token")

        if not access_token:
            return Response(
                {"error": "Access token is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Attempt to sign out the user from all devices using the access token
        result = self.cognitoService.logout_user(access_token)

        if result:
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(
                {"error": "Failed to log out"}, status=status.HTTP_400_BAD_REQUEST
            )


class EmailChangeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    cognitoService = AWSCognitoService()

    def post(self, request, *args, **kwargs):
        user = request.user
        new_email = request.data.get("new_email")

        if not new_email:
            return Response(
                {"error": "New email address is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cognito_response = self.cognitoService.change_email(
            user.email, new_email, user.access_token
        )

        if cognito_response:
            return Response(
                {"success": "Email address updated successfully."},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Failed to update email address in Cognito."},
                status=status.HTTP_400_BAD_REQUEST,
            )


class RefreshTokenAPIView(APIView):
    permission_classes = [IsAuthenticated]

    cognitoService = AWSCognitoService()

    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get("refresh_token")
        if not refresh_token:
            return Response(
                {"error": "Refresh token is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return Response(
                {"error": "Authorization header is missing"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        access_token = auth_header.split(" ")[1]

        decoded_token = decode_token(access_token)
        username = decoded_token.get("sub")
        if not username:
            return Response(
                {"error": "Error decoding token"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        new_tokens = self.cognitoService.refresh_tokens(username, refresh_token)

        if new_tokens:
            return Response(
                {
                    "id_token": new_tokens.get("IdToken"),
                    "access_token": new_tokens.get("AccessToken"),
                    "refresh_token": new_tokens.get("RefreshToken")
                    if new_tokens.get("RefreshToken") is not None
                    else refresh_token,
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"error": "Failed to refresh tokens"},
                status=status.HTTP_400_BAD_REQUEST,
            )

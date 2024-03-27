import jwt
import requests
from django.conf import settings
from django.utils.deprecation import MiddlewareMixin
from rest_framework import exceptions

from services.AWSCognitoService import AWSCognitoService
from util.jwt import decode_token


class RefreshTokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.path.startswith("/api/v1/auth") or request.path in [
            "/api/v1/bidders/",
            "/api/v1/admins/",
        ]:
            return

        id_token = request.COOKIES.get("idToken")
        refresh_token = request.COOKIES.get("refreshToken")
        if not refresh_token:
            return

        try:
            self.verify_jwt_token(id_token)
        except jwt.ExpiredSignatureError:
            cognito_service = AWSCognitoService()
            decoded_id_token = self.decode_jwt_without_validation(id_token)
            new_tokens = cognito_service.refresh_tokens(
                decoded_id_token.get("sub"), refresh_token
            )

            if new_tokens:
                response = self.get_response(request)
                response.set_cookie(
                    "idToken", new_tokens.get("IdToken"), httponly=True, samesite="Lax"
                )
                response.set_cookie(
                    "accessToken",
                    new_tokens.get("AccessToken"),
                    httponly=True,
                    samesite="Lax",
                )
                if "RefreshToken" in new_tokens:
                    response.set_cookie(
                        "refreshToken",
                        new_tokens.get("RefreshToken"),
                        httponly=True,
                        samesite="Lax",
                    )
                return response

        return None

    def verify_jwt_token(self, token):
        jwks_url = settings.SIMPLE_JWT["JWK_URL"]
        jwks = requests.get(jwks_url).json()
        public_keys = {
            jwk["kid"]: jwt.algorithms.RSAAlgorithm.from_jwk(jwk)
            for jwk in jwks["keys"]
        }

        headers = jwt.get_unverified_header(token)
        kid = headers["kid"]
        key = public_keys.get(kid)
        if not key:
            raise exceptions.AuthenticationFailed("Public key not found.")

        return jwt.decode(
            token,
            key=key,
            algorithms=["RS256"],
            audience=settings.SIMPLE_JWT["AUDIENCE"],
            issuer=settings.SIMPLE_JWT["ISSUER"],
        )

    def decode_jwt_without_validation(self, token):
        # Decode without validation
        decoded = jwt.decode(
            token, options={"verify_signature": False, "verify_exp": False}
        )
        return decoded

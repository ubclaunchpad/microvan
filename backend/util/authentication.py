import jwt
import requests
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from rest_framework import authentication, exceptions


class GenericAuthenticatedUser(AnonymousUser):
    def __init__(self, username="", role="", groups=None):
        self._username = username
        self._role = role
        self._groups = groups or []

    @property
    def is_authenticated(self):
        return True

    @property
    def username(self):
        return self._username

    @property
    def role(self):
        return self._role

    def has_group(self, group_name):
        return group_name in self._groups


class AWSCognitoIDTokenAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None

        try:
            token_type, token = auth_header.split(" ")
            if token_type.lower() != "bearer":
                raise exceptions.AuthenticationFailed(
                    "Invalid token header. Token should start with Bearer"
                )
        except ValueError:
            raise exceptions.AuthenticationFailed(
                "Invalid token header. No credentials provided."
            )

        try:
            decoded_token = self.verify_jwt_token(token)
            user = GenericAuthenticatedUser(
                username=decoded_token.get("cognito:username"),
                role="admin"
                if "admins" in decoded_token.get("cognito:groups", [])
                else "bidder",
                groups=decoded_token.get("cognito:groups", []),
            )
            return (user, None)
        except jwt.InvalidTokenError as e:
            raise exceptions.AuthenticationFailed(
                f"Token is invalid or expired: {str(e)}"
            )

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

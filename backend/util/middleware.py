from django.utils.deprecation import MiddlewareMixin
from django_cognito_jwt import JSONWebTokenAuthentication
from rest_framework import exceptions


class JWTAuthenticationMiddleware(MiddlewareMixin):
    def process_request(self, request):
        auth = JSONWebTokenAuthentication()
        auth_header = request.META.get("HTTP_AUTHORIZATION", "")

        if auth_header.startswith("Bearer "):
            token = auth_header.split("Bearer ")[1].strip()
            try:
                user_auth_tuple = auth.authenticate(request)
                if user_auth_tuple is not None:
                    request.user, request.auth = user_auth_tuple
            except exceptions.AuthenticationFailed as e:
                pass

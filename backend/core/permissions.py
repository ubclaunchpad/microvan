import jwt
from rest_framework import permissions


class IsAdminUser(permissions.BasePermission):
    """
    Custom permission to only allow users in the 'admins' Cognito group.
    """

    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        group = self.get_user_group(request)

        required_group = "admins"

        return required_group in group

    def get_user_group(self, request):
        auth_header = request.META.get("HTTP_AUTHORIZATION")
        if not auth_header or not auth_header.startswith("Bearer "):
            return []

        token = auth_header.split("Bearer ")[1].strip()
        try:
            decoded = jwt.decode(token, options={"verify_signature": False})

            groups = decoded.get("cognito:groups", [])
            return groups
        except jwt.DecodeError:
            return []

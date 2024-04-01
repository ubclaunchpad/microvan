from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "cognito_id",
            "email",
            "is_active",
            "is_staff",
            "phone_number",
            "company_name",
            "company_address",
            "is_blacklisted",
            "bidder_number",
            "family_name",
            "given_name",
        ]

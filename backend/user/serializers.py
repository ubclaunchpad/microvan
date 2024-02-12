from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate

from .models import User


class BidderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "company_name",
            "bidder_number",
            "is_verified",
            "is_blacklisted",
        ]


class BidderVerifiedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "is_verified"]


class BidderBlacklistedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "is_blacklisted"]


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "email", "first_name", "last_name", "permission_level"]


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["email"] = user.email
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["is_admin"] = user.is_admin

        return token

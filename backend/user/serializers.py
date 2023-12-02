from rest_framework import serializers

from .models import Admin
from .models import Bidder


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "permission_level",
        ]


class BidderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bidder
        fields = [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "company_name",
            "bidder_number",
            "is_verified",
            "is_blacklisted",
        ]

from rest_framework import serializers

from .models import Bidder


class BidderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bidder
        fields = "__all__"


class BidderVerifiedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bidder
        fields = ["id", "is_verified"]


class BidderBlacklistedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bidder
        fields = ["id", "is_blacklisted"]

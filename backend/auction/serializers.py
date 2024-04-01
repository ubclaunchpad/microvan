from rest_framework import serializers

from .models import Auction, AuctionItem, AuctionVerifiedUser


class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = [
            "id",
            "name",
            "start_date",
            "end_date",
            "start_time",
            "end_time",
            "cover_image",
            "is_published",
        ]


class AuctionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionItem
        fields = ["auction_id", "content_type", "object_id"]


class AuctionVerifiedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionVerifiedUser
        fields = ["auction_id", "cognito_user_id", "is_verified"]

from datetime import date

from rest_framework import serializers

from .models import Auction, AuctionItem, AuctionVerifiedUser


class AuctionSerializer(serializers.ModelSerializer):
    auctionday_id = serializers.SerializerMethodField()

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
            "auctionday_id",  # Add auctionday_id to the fields
        ]

    def get_auctionday_id(self, obj):
        current_date = date.today()
        auction_day = obj.days.filter(date=current_date).first()
        return auction_day.id if auction_day else None


class AuctionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionItem
        fields = ["auction_id", "content_type", "object_id"]


class AuctionVerifiedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionVerifiedUser
        fields = ["auction_id", "cognito_user_id", "is_verified"]

from rest_framework import serializers

from .models import Auction, AuctionItem


class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = ["id", "name", "start_date", "end_date"]

class AuctionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuctionItem
        fields = ['auction_id', 'content_type', 'object_id']


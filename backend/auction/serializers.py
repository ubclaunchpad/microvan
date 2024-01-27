from rest_framework import serializers

from .models import Auction


class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = ["id", "name", "start_date", "end_date"]

from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from .models import Bid


class BidSerializer(serializers.ModelSerializer):
    unit_type = serializers.SerializerMethodField()

    class Meta:
        model = Bid
        fields = ["id", "amount", "bidder", "auction", "unit_type", "object_id"]

    def get_unit_type(self, obj):
        if obj.content_type:
            return obj.content_type.model
        return None
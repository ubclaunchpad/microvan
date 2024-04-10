# signals.py
import json

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from auction.models import AuctionDay

from .models import Bid

channel_layer = get_channel_layer()


@receiver(post_save, sender=Bid)
def bid_updated(sender, instance, **kwargs):
    current_date = instance.auction.start_date.date()
    auction_day = AuctionDay.objects.filter(
        auction=instance.auction, date=current_date
    ).first()

    bid_data = {
        "id": str(instance.id),
        "amount": instance.amount,
        "auction_id": str(instance.auction.id),
        "auction_day_id": str(auction_day.id) if auction_day else None,
        "vehicle_id": str(instance.object_id),
        "bidder": str(instance.bidder),
    }
    async_to_sync(channel_layer.group_send)(
        "bid_updates", {"type": "bid.update", "bid_data": bid_data}
    )


@receiver(post_delete, sender=Bid)
def bid_deleted(sender, instance, **kwargs):
    async_to_sync(channel_layer.group_send)(
        "bid_updates",
        {
            "type": "bid.delete",
            "bid_id": instance.id,
        },
    )

# signals.py
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.core.exceptions import ObjectDoesNotExist
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver

from auction.models import AuctionDay

from .models import Bid

channel_layer = get_channel_layer()


def update_current_price(bid_instance):
    content_type = bid_instance.content_type
    object_id = bid_instance.object_id
    bid_amount = bid_instance.amount

    model_class = content_type.model_class()

    try:
        if hasattr(model_class, "current_price"):
            item = model_class.objects.get(pk=object_id)
            item.current_price = bid_amount
            item.save()
    except ObjectDoesNotExist:
        print(f"Item of type {content_type.model} with ID {object_id} not found.")


@receiver(post_save, sender=Bid)
def bid_updated(sender, instance, created, **kwargs):
    if created:
        bid_data = {
            "id": str(instance.id),
            "amount": instance.amount,
            "auction_id": str(instance.auction.id),
            "auction_day_id": str(instance.auction_day.id)
            if instance.auction_day
            else None,
            "object_id": str(instance.object_id),
            "bidder_id": str(instance.bidder),
        }

        async_to_sync(channel_layer.group_send)(
            "bid_updates",
            {"type": "bid.update", "bid_data": bid_data},
        )

        update_current_price(instance)


@receiver(post_delete, sender=Bid)
def bid_deleted(sender, instance, **kwargs):
    async_to_sync(channel_layer.group_send)(
        "bid_updates",
        {
            "type": "bid.delete",
            "bid_id": instance.id,
        },
    )

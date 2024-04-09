# signals.py
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Bid
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

channel_layer = get_channel_layer()

@receiver(post_save, sender=Bid)
def bid_updated(sender, instance, **kwargs):
    print("got here")
    async_to_sync(channel_layer.group_send)(
        'bid_updates',
        {
            'type': 'bid.update',
            'bid_data': {
                'id': instance.id,
            }
        }
    )

@receiver(post_delete, sender=Bid)
def bid_deleted(sender, instance, **kwargs):
    # Notify bid deletion to consumers
    async_to_sync(channel_layer.group_send)(
        'bid_updates',
        {
            'type': 'bid.delete',
            'bid_id': instance.id,
        }
    )

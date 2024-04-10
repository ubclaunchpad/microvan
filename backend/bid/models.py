from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db import models

from auction.models import Auction
from core.models import MainModel


class Bid(MainModel):
    """
    created_at field on MainModel will be used to determine when the bid was
    """

    amount = models.IntegerField(null=False)
    bidder = models.CharField(null=False, max_length=500)
    auction = models.ForeignKey(Auction, on_delete=models.PROTECT)
    content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)
    object_id = models.UUIDField()
    content_object = GenericForeignKey("content_type", "object_id")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

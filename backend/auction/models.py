from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.db import models

from core.models import MainModel


class Auction(MainModel):
    """
    Auction that bidders can place bid on vehicles
    """

    name = models.CharField(max_length=150, null=True, blank=True)
    start_date = models.DateTimeField(null=False)
    end_date = models.DateTimeField(null=False)
    cover_image = models.CharField(max_length=500, null=True, blank=True)
    is_published = models.BooleanField(default=False)
    start_time = models.TimeField(null=False, default="00:00")
    end_time = models.TimeField(null=False, default="23:59")

    def __str__(self):
        return (
            self.name
            if self.name is not None
            else f"Auction from {self.start_date} to {self.end_date}"
        )


class AuctionDay(MainModel):
    auction = models.ForeignKey(
        Auction, on_delete=models.CASCADE, related_name='days')
    date = models.DateField(null=False)

    class Meta:
        unique_together = ('auction', 'date')


class AuctionItem(MainModel):
    """
    Items that bidders can bid on in a given auction
    """

    auction_day = models.ForeignKey(
        AuctionDay, on_delete=models.PROTECT, related_name='items')
    content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        unique_together = ('auction_day', 'content_type', 'object_id')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class AuctionVerifiedUser(MainModel):
    cognito_user_id = models.CharField(max_length=255, null=False, blank=False)
    auction = models.ForeignKey(Auction, on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)

    class Meta:
        unique_together = ('cognito_user_id', 'auction')
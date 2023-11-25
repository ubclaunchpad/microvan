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

    def __str__(self):
        return (
            self.name
            if self.name is not None
            else "Auction at {start_date} to {end_date}"
        )


class AuctionItem(MainModel):
    """
    Items that bidders can bid on in a given auction
    """

    auction_id = models.ForeignKey(Auction, on_delete=models.PROTECT)
    content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)
    object_id = models.UUIDField()
    content_object = GenericForeignKey("content_type", "object_id")

    class Meta:
        unique_together = ("auction_id", "content_type", "object_id")

    def clean(self):
        # Restrict content_type to specific models
        valid_models = ["vehicle", "equipment", "trailer"]
        if self.content_type.model not in valid_models:
            raise ValidationError(f"ContentType must be one of {valid_models}")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.db import models

from core.models import MainModel
from user.models import Bidder


class Bid(MainModel):
    """
    created_at field on MainModel will be used to determine when the bid was
    """

    amount = models.IntegerField(null=False)
    bidder = models.ForeignKey(Bidder, on_delete=models.PROTECT)
    auction = models.ForeignKey("auction.Auction", on_delete=models.PROTECT)
    content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)
    object_id = models.UUIDField()
    content_object = GenericForeignKey("content_type", "object_id")

    def clean(self):
        # Restrict content_type to specific models
        valid_models = ['vehicle', 'equipment', 'trailer']
        if self.content_type.model not in valid_models:
            raise ValidationError(f"ContentType must be one of {valid_models}")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

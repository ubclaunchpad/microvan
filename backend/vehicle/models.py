from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.core.exceptions import ValidationError
from django.db import models

from core.models import MainModel


class Brand(MainModel):
    name = models.CharField(max_length=150, null=False)


class Type(MainModel):
    name = models.CharField(max_length=150, null=False)


class Vehicle(MainModel):
    unicode_id = models.IntegerField(unique=True)
    model_number = models.CharField(max_length=150, blank=True, null=True)
    chassis_number = models.CharField(max_length=150, blank=True, null=True)
    engine_number = models.CharField(max_length=150, blank=True, null=True)
    selling_price = models.IntegerField(default=0)
    starting_price = models.IntegerField(default=0)
    current_price = models.IntegerField(blank=True, null=True)
    chassis_number = models.CharField(max_length=50, blank=True, null=True)
    description = models.CharField(max_length=2000)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)
    type = models.ForeignKey(Type, on_delete=models.PROTECT)
    is_sold = models.BooleanField(default=False)
    remarks = models.CharField(max_length=2000, blank=True, null=True)
    classification_type = models.CharField(max_length=50, blank=True, null=True)
    engine_condition = models.CharField(max_length=100, blank=True, null=True)
    transmission_condition = models.CharField(max_length=100, blank=True, null=True)
    differentials_condition = models.CharField(max_length=100, blank=True, null=True)
    brake_condition = models.CharField(max_length=100, blank=True, null=True)
    electrical_condition = models.CharField(max_length=100, blank=True, null=True)
    operating_system_condition = models.CharField(max_length=100, blank=True, null=True)
    chassis_condition = models.CharField(max_length=100, blank=True, null=True)
    body_condition = models.CharField(max_length=100, blank=True, null=True)


class Equipment(MainModel):
    unicode_id = models.IntegerField(unique=True)
    model_number = models.CharField(max_length=150, blank=True, null=True)
    chassis_number = models.CharField(max_length=150, blank=True, null=True)
    engine_number = models.CharField(max_length=150, blank=True, null=True)
    description = models.CharField(max_length=2000)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)
    type = models.ForeignKey(Type, on_delete=models.PROTECT)
    selling_price = models.IntegerField(default=0)
    starting_price = models.IntegerField(default=0)
    current_price = models.IntegerField(blank=True, null=True)
    location = models.CharField(max_length=50, blank=True, null=True)
    classification_type = models.CharField(max_length=50, blank=True, null=True)
    engine_condition = models.CharField(max_length=100, blank=True, null=True)
    transmission_condition = models.CharField(max_length=100, blank=True, null=True)
    differentials_condition = models.CharField(max_length=100, blank=True, null=True)
    brake_condition = models.CharField(max_length=100, blank=True, null=True)
    electrical_condition = models.CharField(max_length=100, blank=True, null=True)
    hydraulic_cylinder_condition = models.CharField(
        max_length=500, blank=True, null=True
    )
    hydraulic_hoses_and_chrome_condition = models.CharField(
        max_length=500, blank=True, null=True
    )
    chassis_condition = models.CharField(max_length=100, blank=True, null=True)
    body_condition = models.CharField(max_length=100, blank=True, null=True)


class Supplier(MainModel):
    name = models.CharField(max_length=150, null=False)


class Trailer(MainModel):
    unicode_id = models.IntegerField(unique=True)
    model_number = models.CharField(max_length=150, blank=True, null=True)
    description = models.CharField(max_length=2000)
    supplier = models.ForeignKey(Supplier, on_delete=models.PROTECT)
    type = models.ForeignKey(Type, on_delete=models.PROTECT)
    number_of_axles = models.CharField(max_length=50, blank=True, null=True)
    selling_price = models.IntegerField(default=0)
    starting_price = models.IntegerField(default=0)
    current_price = models.IntegerField(blank=True, null=True)


class UnitImage(MainModel):
    image_url = models.CharField(max_length=500, null=False)
    content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)
    object_id = models.UUIDField()
    content_object = GenericForeignKey("content_type", "object_id")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class SavedUnits(MainModel):
    bidder_id = models.CharField(null=False, max_length=255)
    auction_day = models.ForeignKey("auction.AuctionDay", on_delete=models.PROTECT)
    content_type = models.ForeignKey(ContentType, on_delete=models.PROTECT)
    object_id = models.UUIDField()
    content_object = GenericForeignKey("content_type", "object_id")

    class Meta:
        unique_together = ("auction_day", "object_id")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

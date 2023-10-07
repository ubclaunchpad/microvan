from django.db import models
from core.models import MainModel

class Brand(MainModel):
    name = models.CharField(max_length=150, null=False)

class Truck(MainModel):
    date = models.DateTimeField(editable=False)
    asking_price = models.IntegerField(null=False)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)

    auction = models.ForeignKey("auction.Auction", on_delete=models.PROTECT)

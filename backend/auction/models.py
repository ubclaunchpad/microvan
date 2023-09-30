from django.db import models
from core.models import AuditModel

class Auction(AuditModel):
    date = models.DateTimeField(editable=False)

class Brand(AuditModel):
    name = models.CharField(max_length=150, null=False)

class Truck(AuditModel):
    date = models.DateTimeField(editable=False)
    asking_price = models.IntegerField(null=False)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)

    auction = models.ForeignKey(Auction, on_delete=models.PROTECT)


class Bid(AuditModel):
    amount = models.IntegerField(null=False)
    truck = models.ForeignKey(Truck, on_delete=models.PROTECT)
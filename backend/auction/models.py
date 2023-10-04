from django.db import models
from core.models import MainModel
from user.models import User

class Auction(MainModel):
    # start date is given by MainMode's created_at date
    end_date = models.DateTimeField(editable=False)

class Brand(MainModel):
    name = models.CharField(max_length=150, null=False)

class Truck(MainModel):
    date = models.DateTimeField(editable=False)
    asking_price = models.IntegerField(null=False)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)

    auction = models.ForeignKey(Auction, on_delete=models.PROTECT)


class Bid(MainModel):
    amount = models.IntegerField(null=False)
    truck = models.ForeignKey(Truck, on_delete=models.PROTECT)
    bidder = models.ForeignKey(User, on_delete=models.PROTECT)
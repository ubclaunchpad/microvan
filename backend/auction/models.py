from django.db import models
from core.models import MainModel
from user.models import User
from product.models import Truck
class Auction(MainModel):
    # start date is given by MainMode's created_at date
    end_date = models.DateTimeField(editable=False)


class Bid(MainModel):
    amount = models.IntegerField(null=False)
    truck = models.ForeignKey(Truck, on_delete=models.PROTECT)
    bidder = models.ForeignKey(User, on_delete=models.PROTECT)
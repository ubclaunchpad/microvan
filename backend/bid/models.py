from django.db import models

from core.models import MainModel
from user.models import User
from vehicle.models import Vehicle


class Bid(MainModel):
    amount = models.IntegerField(null=False)
    vehicle = models.ForeignKey(Vehicle, on_delete=models.PROTECT)
    bidder = models.ForeignKey(User, on_delete=models.PROTECT)

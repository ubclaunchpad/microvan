from django.db import models
from core.models import AuditModel
from auction.models import Auction
# Create your models here.
class User(AuditModel):
    """
        A user will become a bidder if their manytomanyfield contains the 
        auction in question. An auction will have many bidders, and a bidder
        will be in many auctions. 
    """
    name = models.CharField(max_length=150, null=False)
    email = models.CharField(max_length=150, null=False)
    auction = models.ManyToManyField(Auction)
from django.db import models
from core.models import MainModel
# Create your models here.
class User(MainModel):
    """
        The model used for handling users, this includes bidders and admins.
        A user will become a bidder if their manytomanyfield contains the 
        auction in question. An auction will have many bidders, and a bidder
        will be in many auctions.

        
    """
    name = models.CharField(max_length=150, null=False)
    email = models.CharField(max_length=150, null=False)
    auction = models.ManyToManyField('auction.Auction', related_name='auction')
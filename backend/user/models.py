import random

from django.db import models

from core.models import MainModel
from vehicle.models import Vehicle


# Create your models here.
class Admin(MainModel):
    email = models.CharField(max_length=150, null=False)
    first_name = models.CharField(max_length=150, null=False)
    last_name = models.CharField(max_length=150, null=False)
    permission_level = models.IntegerField(default=0)

    def __str__(self):
        return f"Admin: {self.first_name} {self.last_name}"


class Bidder(MainModel):
    email = models.CharField(max_length=150, null=False)
    first_name = models.CharField(max_length=150, null=False)
    last_name = models.CharField(max_length=150, null=False)
    company_name = models.CharField(max_length=150, blank=True, null=True)
    bidder_number = models.IntegerField(unique=True, blank=True, null=False)
    is_verified = models.BooleanField(default=False)
    is_blacklisted = models.BooleanField(default=False)
    saved_list = models.ManyToManyField(Vehicle)

    def save(self, *args, **kwargs):
        # Check if the bidder_number is not set yet
        if not self.bidder_number:
            # Generate a unique 8-digit number
            bidder_number = self.generate_unique_bidder_number()
            self.bidder_number = bidder_number
        super(Bidder, self).save(*args, **kwargs)

    def generate_unique_bidder_number(self):
        # Generate an 8-digit number and check if it's unique
        for _ in range(99999999):
            bidder_number = random.randint(10000000, 99999999)
            if not Bidder.objects.filter(bidder_number=bidder_number).exists():
                return bidder_number
        raise Exception("Could not generate unique bidder number")

    def __str__(self):
        return f"Bidder: {self.first_name} {self.last_name}"

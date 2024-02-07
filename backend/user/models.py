import random

from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    is_admin = models.BooleanField(default=False)
    permission_level = models.IntegerField(
        default=0, blank=True, null=True
    )  # For Admins
    company_name = models.CharField(
        max_length=150, blank=True, null=True
    )  # For Bidders
    company_address = models.CharField(
        max_length=150, blank=True, null=True
    )  # For Bidders
    phone_number = models.CharField(max_length=15, blank=True, null=True)  # For Bidders
    bidder_number = models.IntegerField(
        unique=True, blank=True, null=True
    )  # For Bidders
    is_verified = models.BooleanField(
        default=False, blank=True, null=True
    )  # For Bidders
    is_blacklisted = models.BooleanField(
        default=False, blank=True, null=True
    )  # For Bidders

    def save(self, *args, **kwargs):
        if not self.is_admin and not self.bidder_number:
            self.bidder_number = self.generate_unique_bidder_number()
        super().save(*args, **kwargs)

    def generate_unique_bidder_number(self):
        while True:
            bidder_number = random.randint(10000000, 99999999)
            if not User.objects.filter(bidder_number=bidder_number).exists():
                return bidder_number

    def __str__(self):
        return f"{'Admin' if self.is_admin else 'Bidder'}: {self.first_name} {self.last_name}"

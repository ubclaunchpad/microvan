from django.db import models

from core.models import MainModel


class Auction(MainModel):
    """
    Auction that bidders can place bid on vehicles
    """

    name = models.CharField(max_length=150)
    start_date = models.DateTimeField(null=False)
    end_date = models.DateTimeField(null=False)

    def __str__(self):
        return (
            self.name
            if self.name is not None
            else "Auction at {start_date} to {end_date}"
        )

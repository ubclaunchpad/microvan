from django.db import models
from core.models import MainModel
from user.models import User
from vehicle.models import Vehicle
class Auction(MainModel):
    # start date is given by MainMode's created_at date
    end_date = models.DateTimeField(editable=False)

from django.db import models
from core.models import MainModel

class Brand(MainModel):
    name = models.CharField(max_length=150, null=False)
    

class VehicleType(MainModel):
    name = models.CharField(max_length=150, null=False)
    
class Vehicle(MainModel):
    date = models.DateTimeField(editable=False)
    asking_price = models.IntegerField(null=False)
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)
    description = models.CharField(max_length=2000)
    auction = models.ForeignKey("auction.Auction", on_delete=models.PROTECT)
    unicode_id = models.IntegerField()
    model_number = models.IntegerField()
    vehicle_type = models.ForeignKey(VehicleType, on_delete=models.PROTECT)

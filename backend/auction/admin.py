from django.contrib import admin

from auction.models import Auction
from bid.models import Bid
from user.models import User
from vehicle.models import Brand, Vehicle, VehicleType

# Register your models here.
admin.site.register(Auction)
admin.site.register(Vehicle)
admin.site.register(Brand)
admin.site.register(VehicleType)
admin.site.register(Bid)
admin.site.register(User)

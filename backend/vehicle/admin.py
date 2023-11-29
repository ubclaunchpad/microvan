from django.contrib import admin

from .models import Brand, Equipment, Supplier, Trailer, Type, UnitImage, Vehicle

# Register your models here.
admin.site.register(Brand)
admin.site.register(Type)
admin.site.register(Vehicle)
admin.site.register(Equipment)
admin.site.register(Supplier)
admin.site.register(Trailer)
admin.site.register(UnitImage)

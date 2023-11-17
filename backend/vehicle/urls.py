from django.contrib import admin
from django.urls import include, path

from .views import VehicleListApiView, VehicleDetailApiView

urlpatterns = [
    path("", VehicleListApiView.as_view(), name="vehicle"),
    path("<uuid:vehicle_id>/", VehicleDetailApiView.as_view(), name="vehicle_detail"),
]

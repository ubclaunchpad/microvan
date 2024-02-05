from django.contrib import admin
from django.urls import include, path

from .views import (
    VehicleDetailApiView,
    VehicleFilterList,
    VehicleListApiView,
    VehiclePriceApiView,
)

urlpatterns = [
    path("", VehicleListApiView.as_view(), name="vehicle"),
    path("filter/", VehicleFilterList.as_view(), name="vehicle-list"),
    path("<uuid:vehicle_id>/", VehicleDetailApiView.as_view(), name="vehicle_detail"),
    path(
        "<uuid:vehicle_id>/minimum_price/",
        VehiclePriceApiView.as_view(),
        name="vehicle_price",
    ),
]

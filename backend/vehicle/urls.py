from django.contrib import admin
from django.urls import include, path

from .views import VehicleDetailApiView, VehicleListApiView, VehicleFilterList

urlpatterns = [
    path("create/", VehicleListApiView.as_view(), name="vehicle"),
    path('filter/', VehicleFilterList.as_view(), name='vehicle-list'),
    path("<uuid:vehicle_id>/", VehicleDetailApiView.as_view(), name="vehicle_detail"),
]

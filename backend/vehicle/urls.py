from django.contrib import admin
from django.urls import include, path

from .views import VehicleListApiView

urlpatterns = [
    path("", VehicleListApiView.as_view(), name="vehicle"),
]

from django.contrib import admin
from django.urls import include, path

from .views import VehicleAPIView

urlpatterns = [
    path("", VehicleAPIView.as_view(), name="vehicle"),
]

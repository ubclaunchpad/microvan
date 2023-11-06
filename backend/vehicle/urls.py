from django.contrib import admin
from django.urls import include, path

from vehicle import views

urlpatterns = [
    path("", views.VehicleAPIView.as_view(), name="vehicle"),
]

from django.contrib import admin
from django.urls import include, path
from vehicle.views import VehicleAPIView
urlpatterns = [
    path('details', VehicleAPIView.as_view(), name='vehicle_api_view'),
]

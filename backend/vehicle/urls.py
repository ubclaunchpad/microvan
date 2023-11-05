from django.contrib import admin
from django.urls import include, path

from vehicle import views

urlpatterns = [
    path("", views.VehicleAPIView.as_view(), name="vehicle"),
    path('<uuid:identifier>/update/', views.VehicleUpdateAPIView.as_view(), name='update-vehicle'),
    path('your-model/<uuid:identifier>/update/', views.VehicleDeleteAPIView.as_view(), name='delete-vehicle'),


]

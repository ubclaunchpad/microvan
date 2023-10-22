from django.contrib import admin
from django.urls import include, path

from .views import AuctionListApiView

urlpatterns = [
    path("", AuctionListApiView.as_view(), name="auction"),
]

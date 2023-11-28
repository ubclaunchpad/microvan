from django.contrib import admin
from django.urls import include, path

from .views import BidDetailApiView, BidListApiView

urlpatterns = [
    path("", BidListApiView.as_view(), name="bid_list"),
    path("<uuid:bid_id>/", BidDetailApiView.as_view(), name="bid_detail"),
]


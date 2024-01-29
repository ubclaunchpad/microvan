from django.contrib import admin
from django.urls import include, path

from .views import AuctionDetailApiView, AuctionListApiView, AddToAuctionApiView

urlpatterns = [
    path("", AuctionListApiView.as_view(), name="auction_list"),
    path("<uuid:auction_id>/", AuctionDetailApiView.as_view(), name="auction_detail"),
    path(
        "<uuid:auction_id>/vehicles/<uuid:vehicle_id>",
        AddToAuctionApiView.as_view(),
        name="add_to_auction",
    ),
]

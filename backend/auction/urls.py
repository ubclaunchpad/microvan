from django.contrib import admin
from django.urls import include, path

from .views import (
    AddToAuctionApiView,
    AuctionDetailApiView,
    AuctionListApiView,
    AuctionVehiclesApiView,
    BidderVerificationApiView,
    GetSavedUnitApiView,
    SaveUnitApiView,
)

urlpatterns = [
    path("/", AuctionListApiView.as_view(), name="auction_list"),
    path("/<uuid:auction_id>", AuctionDetailApiView.as_view(), name="auction_detail"),
    path(
        "/<uuid:auction_id>/bidders/<str:bidder_id>/vehicles/<uuid:vehicle_id>",
        SaveUnitApiView.as_view(),
        name="auction_detail",
    ),
    path(
        "/<uuid:auction_id>/bidders/<str:bidder_id>/vehicles",
        GetSavedUnitApiView.as_view(),
        name="auction_detail",
    ),
    path(
        "/<uuid:auction_id>/vehicles",
        AddToAuctionApiView.as_view(),
        name="add_to_auction",
    ),
    path(
        "/<uuid:auction_id>/vehicles",
        AuctionVehiclesApiView.as_view(),
        name="auction_vehicles",
    ),
]

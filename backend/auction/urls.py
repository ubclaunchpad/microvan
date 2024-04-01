from django.contrib import admin
from django.urls import include, path

from .views import (
    AuctionDayApiView,
    AuctionDetailApiView,
    AuctionListApiView,
    AuctionVehiclesApiView,
    BidderVerificationApiView,
    CurrentAuctionApiView,
    GetSavedUnitApiView,
    SaveUnitApiView,
)

urlpatterns = [
    path("", AuctionListApiView.as_view(), name="auction_list"),
    path("/current", CurrentAuctionApiView.as_view(), name="current_auction_list"),
    path("/<uuid:auction_id>", AuctionDetailApiView.as_view(), name="auction_detail"),
    path("/<uuid:auction_id>/day", AuctionDayApiView.as_view(), name="auction_day"),
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
        "/<uuid:auction_id>/days/<uuid:auction_day_id>/vehicles",
        AuctionVehiclesApiView.as_view(),
        name="auction_vehicles",
    ),
    path(
        "/<uuid:auction_id>/verification",
        BidderVerificationApiView.as_view(),
        name="bidder_verification",
    ),
]

from django.contrib import admin
from django.urls import include, path

from .views import (
    AuctionDayApiView,
    AuctionDetailApiView,
    AuctionItemsApiView,
    AuctionListApiView,
    BidderVerificationApiView,
    CurrentAuctionApiView,
    GetSavedUnitApiView,
    PastAuctionsApiView,
    SaveUnitApiView,
    UpcomingAuctionApiView,
)

urlpatterns = [
    path("", AuctionListApiView.as_view(), name="auction_list"),
    path("/current", CurrentAuctionApiView.as_view(), name="current_auction_list"),
    path("/upcoming", UpcomingAuctionApiView.as_view(), name="upcoming_auction_list"),
    path("/past", PastAuctionsApiView.as_view(), name="past_auction_list"),
    path("/<uuid:auction_id>", AuctionDetailApiView.as_view(), name="auction_detail"),
    path("/<uuid:auction_id>/day", AuctionDayApiView.as_view(), name="auction_day"),
    path(
        "/<uuid:auction_day_id>/bidders/<str:bidder_id>/vehicles/<uuid:vehicle_id>",
        SaveUnitApiView.as_view(),
        name="auction_detail",
    ),
    path(
        "/<uuid:auction_day_id>/bidders/<str:bidder_id>/vehicles",
        GetSavedUnitApiView.as_view(),
        name="auction_detail",
    ),
    path(
        "/<uuid:auction_id>/days/<uuid:auction_day_id>/vehicles",
        AuctionItemsApiView.as_view(),
        name="auction_vehicles",
    ),
    path(
        "/<uuid:auction_id>/verified",
        BidderVerificationApiView.as_view(),
        name="bidder_verification",
    ),
]

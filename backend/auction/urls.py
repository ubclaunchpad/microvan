from django.contrib import admin
from django.urls import include, path

from .views import (
    AuctionDetailApiView,
    AuctionListApiView,
    SaveUnitApiView,
    GetSavedUnitApiView,
)

urlpatterns = [
    path("", AuctionListApiView.as_view(), name="auction_list"),
    path("<uuid:auction_id>/", AuctionDetailApiView.as_view(), name="auction_detail"),
    path(
        "<uuid:auction_id>/bidders/<uuid:bidder_id>/vehicles/<uuid:vehicle_id>/",
        SaveUnitApiView.as_view(),
        name="auction_detail",
    ),
    path(
        "<uuid:auction_id>/bidders/<uuid:bidder_id>/vehicles/",
        GetSavedUnitApiView.as_view(),
        name="auction_detail",
    ),
]

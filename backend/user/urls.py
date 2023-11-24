from django.contrib import admin
from django.urls import include, path

from .views import (
    BidderBlacklistApiView, BidderDetailApiView, BidderListApiView,
    BidderVerifyApiView)

urlpatterns = [
    path("bidders/", BidderListApiView.as_view(), name="bidder-list"),
    path(
        "bidders/<uuid:bidder_id>/", BidderDetailApiView.as_view(), name="bidder-detail"
    ),
    path(
        "bidders/<uuid:bidder_id>/verify",
        BidderVerifyApiView.as_view(),
        name="bidder-verify",
    ),
    path(
        "bidders/<uuid:bidder_id>/blacklist",
        BidderBlacklistApiView.as_view(),
        name="bidder-blacklist",
    ),
]

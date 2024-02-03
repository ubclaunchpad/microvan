from django.contrib import admin
from django.urls import include, path

from .views import (
    AdminDetailApiView,
    AdminListApiView,
    BidderBlacklistApiView,
    BidderDetailApiView,
    BidderListApiView,
    BidderVerifyApiView,
    SaveUnitApiView
)

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
    path("admins/", AdminListApiView.as_view(), name="admin-list"),
    path("admins/<uuid:admin_id>/", AdminDetailApiView.as_view(), name="admin-detail"),
    path("<uuid:bidder_id>/vehicles/<uuid:vehicle_id>", SaveUnitApiView.as_view(), name="save-unit-to-list"),

]

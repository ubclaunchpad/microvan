from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    AdminDetailApiView,
    AdminListApiView,
    BidderBlacklistApiView,
    BidderDetailApiView,
    BidderListApiView,
    BidderVerifyApiView,
    ListBlacklisted,
    ListUnverified,
    ListVerified,
    MyTokenObtainPairView,
)

urlpatterns = [
    # Authentication
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  
    # Bidders
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
    path("bidders/unverified", ListUnverified.as_view(), name="unverified-list"),
    path("bidders/blacklisted", ListBlacklisted.as_view(), name="blacklisted-list"),
    path("bidders/verified", ListVerified.as_view(), name="verified-list"),

    # Admins
    path("admins/", AdminListApiView.as_view(), name="admin-list"),
    path("admins/<uuid:admin_id>/", AdminDetailApiView.as_view(), name="admin-detail"),
]

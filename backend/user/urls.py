from django.contrib import admin
from django.urls import include, path

from .views import (
    AdminDetailApiView,
    AdminListApiView,
    BidderBlacklistApiView,
    BidderDetailApiView,
    BidderListApiView,
    BidderVerifyApiView,
)
from rest_framework_simplejwt import views as jwt_views

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
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]

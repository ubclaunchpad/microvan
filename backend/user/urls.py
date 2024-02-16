from django.urls import path

from .views import (
    AdminDetailApiView, AdminListApiView, BidderBlacklistApiView,
    BidderDetailApiView, BidderListApiView, BidderVerifyApiView,
    ListBlacklisted, ListUnverified, ListVerified, LoginAPIView, LogoutAPIView,
    PasswordResetAPIView, PasswordResetConfirmAPIView, RefreshTokenAPIView,
    VerifyEmailAPIView)

urlpatterns = [
    # Authentication
    path("auth/refresh/", RefreshTokenAPIView.as_view(), name="token_refresh"),
    path("auth/login/", LoginAPIView.as_view(), name="auth-login"),
    path("auth/logout/", LogoutAPIView.as_view(), name="auth-logout"),
    path(
        "auth/password-reset/",
        PasswordResetAPIView.as_view(),
        name="auth-password-reset",
    ),
    path(
        "auth/password-reset/confirm/",
        PasswordResetConfirmAPIView.as_view(),
        name="auth-password-reset-confirm",
    ),
    path("auth/email-verify/", VerifyEmailAPIView.as_view(), name="auth-email-verify"),
    path("auth/email-reset/", PasswordResetAPIView.as_view(), name="auth-email-reset"),
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

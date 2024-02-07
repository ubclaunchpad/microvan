from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import User


# Define a custom UserAdmin
class CustomUserAdmin(BaseUserAdmin):
    model = User

    list_display = (
        "id",
        "email",
        "first_name",
        "last_name",
        "is_admin",
        "permission_level",
        "company_name",
        "bidder_number",
        "is_verified",
        "is_blacklisted",
    )

    search_fields = (
        "email",
        "first_name",
        "last_name",
        "company_name",
        "bidder_number",
    )

    list_filter = (
        "is_admin",
        "is_verified",
        "is_blacklisted",
        "permission_level",
    ) + BaseUserAdmin.list_filter

    fieldsets = BaseUserAdmin.fieldsets + (
        (None, {"fields": ("is_admin", "permission_level")}),
        (
            "Bidder Information",
            {
                "fields": (
                    "company_name",
                    "bidder_number",
                    "is_verified",
                    "is_blacklisted",
                )
            },
        ),
    )

    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        (None, {"fields": ("is_admin", "permission_level")}),
        (
            "Bidder Information",
            {
                "fields": (
                    "company_name",
                    "bidder_number",
                    "is_verified",
                    "is_blacklisted",
                )
            },
        ),
    )


# Register the User model with the customized UserAdmin
admin.site.register(User, CustomUserAdmin)

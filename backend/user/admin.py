from django.contrib import admin

from .models import Admin, Bidder


class AdminAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "first_name",
        "last_name",
        "permission_level",
        "created_at",
    )
    search_fields = ("email", "first_name", "last_name")
    list_filter = ("permission_level",)


class BidderAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "first_name",
        "last_name",
        "company_name",
        "bidder_number",
        "is_verified",
        "is_blacklisted",
        "created_at",
    )
    search_fields = (
        "email",
        "first_name",
        "last_name",
        "company_name",
        "bidder_number",
    )
    list_filter = ("is_verified", "is_blacklisted")


# Register your models here
admin.site.register(Admin, AdminAdmin)
admin.site.register(Bidder, BidderAdmin)

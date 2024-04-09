from django.contrib import admin

from .models import Auction, AuctionDay, AuctionItem, AuctionVerifiedUser


class AuctionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "name",
        "start_date",
        "end_date",
        "start_time",
        "end_time",
        "is_published",
    )
    search_fields = ("name",)
    list_filter = ("is_published", "start_date", "end_date")
    ordering = ("-start_date",)


class AuctionDayAdmin(admin.ModelAdmin):
    list_display = ("id", "auction", "date")
    search_fields = ("auction__name",)
    list_filter = ("auction", "date")
    ordering = ("-date",)


class AuctionItemAdmin(admin.ModelAdmin):
    list_display = ("id", "auction_day", "content_type", "object_id")
    search_fields = ("auction_day__auction__name", "content_type__model")
    list_filter = ("auction_day", "content_type")


class AuctionVerifiedUserAdmin(admin.ModelAdmin):
    list_display = ("id", "cognito_user_id", "auction", "is_verified")
    search_fields = ("cognito_user_id", "auction__name")
    list_filter = ("auction", "is_verified")


# Register your models here
admin.site.register(Auction, AuctionAdmin)
admin.site.register(AuctionItem, AuctionItemAdmin)
admin.site.register(AuctionDay, AuctionDayAdmin)
admin.site.register(AuctionVerifiedUser, AuctionVerifiedUserAdmin)

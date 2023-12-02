from django.contrib import admin

from .models import Auction, AuctionItem


class AuctionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "start_date", "end_date", "is_published")
    search_fields = ("name",)
    list_filter = ("is_published", "start_date", "end_date")
    ordering = ("-start_date",)


class AuctionItemAdmin(admin.ModelAdmin):
    list_display = ("id", "auction_id", "content_type", "object_id")
    search_fields = ("auction_id__name", "content_type__model")
    list_filter = ("auction_id", "content_type")


# Register your models here
admin.site.register(Auction, AuctionAdmin)
admin.site.register(AuctionItem, AuctionItemAdmin)

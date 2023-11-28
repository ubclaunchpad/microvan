from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline

from auction.models import Auction

from .models import Bid


class BidAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "amount",
        "bidder",
        "auction",
        "content_type",
        "object_id",
        "created_at",
    )
    search_fields = ("bidder__username", "auction__name", "amount")
    list_filter = ("auction", "bidder", "content_type")

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        # This method can be used to filter foreign key choices in the admin
        if db_field.name == "auction":
            kwargs["queryset"] = Auction.objects.filter(is_published=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Register your models here
admin.site.register(Bid, BidAdmin)

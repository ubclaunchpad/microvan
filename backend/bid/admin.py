from django.contrib import admin
from django.contrib.contenttypes.models import ContentType

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
        if db_field.name == "content_type":
            valid_models = ["vehicle", "equipment", "trailer"]
            kwargs["queryset"] = ContentType.objects.filter(model__in=valid_models)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Register your models here
admin.site.register(Bid, BidAdmin)

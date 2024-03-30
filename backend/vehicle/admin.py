from django.contrib import admin
from django.contrib.contenttypes.models import ContentType

from .models import (
    Brand,
    Equipment,
    SavedUnits,
    Supplier,
    Trailer,
    Type,
    UnitImage,
    Vehicle,
)


class BrandAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")
    search_fields = ("name",)


class TypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")
    search_fields = ("name",)


class VehicleAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "unicode_id",
        "engine_number",
        "model_number",
        "chassis_number",
        "brand",
        "vehicle_type",
        "is_sold",
        "created_at",
    )
    search_fields = (
        "model_number",
        "chassis_number",
        "brand__name",
        "vehicle_type__name",
    )
    list_filter = ("brand", "vehicle_type", "is_sold")


class EquipmentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "unicode_id",
        "prefix_id",
        "chassis_number",
        "engine_number",
        "brand",
        "equipment_type",
        "created_at",
    )
    search_fields = (
        "prefix_id",
        "chassis_number",
        "engine_number",
        "brand__name",
        "equipment_type__name",
    )
    list_filter = ("brand", "equipment_type")


class SupplierAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")
    search_fields = ("name",)


class TrailerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "unicode_id",
        "chassis_number",
        "supplier",
        "trailer_type",
        "number_of_axles",
        "created_at",
    )
    search_fields = ("chassis_number", "supplier__name", "trailer_type__name")
    list_filter = ("supplier", "trailer_type")


class UnitImageAdmin(admin.ModelAdmin):
    list_display = ("id", "image_url", "content_type", "object_id", "created_at")
    search_fields = ("content_type__model",)
    list_filter = ("content_type",)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "content_type":
            valid_models = ["vehicle", "equipment", "trailer"]
            kwargs["queryset"] = ContentType.objects.filter(model__in=valid_models)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class SavedUnitsAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "bidder_id",
        "auction_id",
        "content_type",
        "object_id",
        "created_at",
    )
    search_fields = ("auction_id__name", "content_type__model")
    list_filter = ("auction_id", "content_type")

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "content_type":
            valid_models = ["vehicle", "equipment", "trailer"]
            kwargs["queryset"] = ContentType.objects.filter(model__in=valid_models)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Register your models here
admin.site.register(Brand, BrandAdmin)
admin.site.register(Type, TypeAdmin)
admin.site.register(Vehicle, VehicleAdmin)
admin.site.register(Equipment, EquipmentAdmin)
admin.site.register(Supplier, SupplierAdmin)
admin.site.register(Trailer, TrailerAdmin)
admin.site.register(UnitImage, UnitImageAdmin)
admin.site.register(SavedUnits, SavedUnitsAdmin)

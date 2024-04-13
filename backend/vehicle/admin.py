from django.contrib import admin
from django.contrib.contenttypes.admin import GenericTabularInline
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


class UnitImageInline(GenericTabularInline):
    model = UnitImage
    extra = 1


class BrandAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")
    search_fields = ("name",)
    readonly_fields = ("created_at",)


class TypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")
    search_fields = ("name",)
    readonly_fields = ("created_at",)


class VehicleAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "unicode_id",
        "engine_number",
        "model_number",
        "chassis_number",
        "brand",
        "type",
        "is_sold",
        "created_at",
    )
    search_fields = (
        "model_number",
        "chassis_number",
        "brand__name",
        "type__name",
    )
    list_filter = ("brand", "type", "is_sold")
    readonly_fields = ("created_at",)
    inlines = [UnitImageInline]


class EquipmentAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "unicode_id",
        "model_number",
        "chassis_number",
        "engine_number",
        "brand",
        "type",
        "created_at",
    )
    search_fields = (
        "model_number",
        "chassis_number",
        "engine_number",
        "brand__name",
        "type__name",
    )
    list_filter = ("brand", "type")
    readonly_fields = ("created_at",)
    inlines = [UnitImageInline]


class SupplierAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "created_at")
    search_fields = ("name",)
    readonly_fields = ("created_at",)


class TrailerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "unicode_id",
        "model_number",
        "supplier",
        "type",
        "number_of_axles",
        "created_at",
    )
    search_fields = ("model_number", "supplier__name", "type__name")
    list_filter = ("supplier", "type")
    readonly_fields = ("created_at",)
    inlines = [UnitImageInline]


class UnitImageAdmin(admin.ModelAdmin):
    list_display = ("id", "image_url", "content_type", "object_id", "created_at")
    search_fields = ("content_type__model",)
    list_filter = ("content_type",)
    readonly_fields = ("created_at",)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "content_type":
            kwargs["queryset"] = ContentType.objects.filter(
                model__in=["vehicle", "equipment", "trailer"]
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


class SavedUnitsAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "bidder_id",
        "auction_day",
        "content_type",
        "object_id",
        "created_at",
    )
    list_filter = ("auction_day", "content_type")
    readonly_fields = ("created_at",)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "content_type":
            kwargs["queryset"] = ContentType.objects.filter(
                model__in=["vehicle", "equipment", "trailer"]
            )
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


# Register your models and their admins
admin.site.register(Brand, BrandAdmin)
admin.site.register(Type, TypeAdmin)
admin.site.register(Vehicle, VehicleAdmin)
admin.site.register(Equipment, EquipmentAdmin)
admin.site.register(Supplier, SupplierAdmin)
admin.site.register(Trailer, TrailerAdmin)
admin.site.register(UnitImage, UnitImageAdmin)
admin.site.register(SavedUnits, SavedUnitsAdmin)

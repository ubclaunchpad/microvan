from django.contrib.contenttypes.models import ContentType
from rest_framework import serializers

from .models import Brand, Equipment, Supplier, Trailer, Type, UnitImage, Vehicle


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name"]


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ["id", "name"]


class EquipmentSerializer(serializers.ModelSerializer):
    brand_name = serializers.SerializerMethodField()
    type_name = serializers.SerializerMethodField()
    content_type = serializers.SerializerMethodField()

    class Meta:
        model = Equipment
        fields = [
            "id",
            "unicode_id",
            "model_number",
            "chassis_number",
            "engine_number",
            "description",
            "brand_name",
            "type_name",
            "starting_price",
            "current_price",
            "content_type",
        ]

    def get_brand_name(self, obj):
        return obj.brand.name

    def get_type_name(self, obj):
        return obj.type.name

    def get_content_type(self, obj):
        return obj._meta.model_name


class VehicleSerializer(serializers.ModelSerializer):
    brand_name = serializers.SerializerMethodField()
    type_name = serializers.SerializerMethodField()
    content_type = serializers.SerializerMethodField()

    class Meta:
        model = Vehicle
        fields = [
            "id",
            "unicode_id",
            "model_number",
            "engine_number",
            "chassis_number",
            "description",
            "brand_name",
            "type_name",
            "starting_price",
            "current_price",
            "content_type",
        ]

    def get_brand_name(self, obj):
        return obj.brand.name

    def get_type_name(self, obj):
        return obj.type.name

    def get_content_type(self, obj):
        return obj._meta.model_name


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ["id", "name"]


class TrailerSerializer(serializers.ModelSerializer):
    brand_name = serializers.SerializerMethodField()
    type_name = serializers.SerializerMethodField()
    content_type = serializers.SerializerMethodField()

    class Meta:
        model = Trailer
        fields = [
            "id," "unicode_id",
            "model_number",
            "description",
            "supplier_name",
            "type_name",
            "starting_price",
            "current_price",
            "content_type",
        ]

    def get_supplier_name(self, obj):
        return obj.supplier.name

    def get_type_name(self, obj):
        return obj.type.name

    def get_content_type(self, obj):
        return obj._meta.model_name


class UnitImageSerializer(serializers.ModelSerializer):
    unit_type = serializers.SerializerMethodField()

    class Meta:
        model = UnitImage
        fields = ["id", "image_url", "unit_type", "object_id"]

    def get_unit_type(self, obj):
        if obj.content_type:
            return obj.content_type.model
        return None


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name"]


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ["id", "name"]

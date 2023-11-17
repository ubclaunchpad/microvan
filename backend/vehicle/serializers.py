from rest_framework import serializers

from .models import (
    Brand, Equipment, Supplier, Trailer, Type, UnitImage, Vehicle)


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ["id", "name"]


class TypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type
        fields = ["id", "name"]


class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = [
            "id",
            "unicode_id",
            "prefix_id",
            "chassis_number",
            "engine_number",
            "description",
            "brand",
            "equipment_type",
            "location",
            "classification_type",
            "engine_condition",
            "transmission_condition",
            "differentials_condition",
            "brake_condition",
            "electrical_condition",
            "hydraulic_cylindar_condition",
            "hydraulic_hoses_and_chrome_condition",
            "chassis_condition",
            "body_condition",
        ]


class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
            "id",
            "unicode_id",
            "model_number",
            "chassis_number",
            "description",
            "brand",
            "vehicle_type",
            "minimum_price",
            "is_sold",
            "remarks",
            "classification_type",
            "engine_condition",
            "transmission_condition",
            "differentials_condition",
            "brake_condition",
            "electrical_condition",
            "operating_system_condition",
            "chassis_condition",
            "body_condition",
        ]


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ["id", "name"]


class TrailerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trailer
        fields = [
            "id," "unicode_id",
            "chassis_number",
            "description",
            "supplier",
            "trailer_type",
            "number_of_axles",
        ]


class UnitImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnitImage
        fields = ["id", "image_url", "content_type", "object_id", "content_object"]

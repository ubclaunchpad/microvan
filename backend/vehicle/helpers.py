import pandas as pd
from django.db import IntegrityError

from .models import Brand, Equipment, Supplier, Trailer, Type, Vehicle
from .serializers import EquipmentSerializer, TrailerSerializer, VehicleSerializer


def parse_excel_to_vehicle(excel_file):
    df0 = pd.read_excel(excel_file, sheet_name=0, engine="openpyxl")
    vehicles = []

    for index, row in df0.iterrows():
        if pd.isna(row["UNICODE"]):
            continue

        if Vehicle.objects.filter(unicode_id=row["UNICODE"]).exists():
            print(
                f"Skipping vehicle with UNICODE {row['UNICODE']} as it already exists."
            )
            continue

        vehicle_data = {
            "unicode_id": row["UNICODE"],
            "model_number": row["MODEL"],
            "chassis_number": row["CHASSIS"],
            "engine_number": row["ENGINE NUMBER"],
            "description": row["DESCRIPTION"],
            "remarks": row["REMARKS"],
            "classification_type": row["CLASSIFICATION TYPE"],
            "engine_condition": row["ENGINE"],
            "transmission_condition": row["TRANSMISSION"],
            "differentials_condition": row["Differentials / Drive Train"],
            "brake_condition": row["BRAKES"],
            "electrical_condition": row["Electrical / Computer System"],
            "operating_system_condition": row[
                "Operating System (i.e. Dumping System, Manlift System, etc.)"
            ],
            "chassis_condition": row["Chassis"],
            "body_condition": row["Body"],
        }

        brand, _ = Brand.objects.get_or_create(name=row["BRAND"])
        type, _ = Type.objects.get_or_create(name=row["TYPE"])

        vehicle_data.update({"brand": brand, "type": type})

        try:
            vehicle = Vehicle.objects.create(**vehicle_data)
            vehicles.append(vehicle)
        except IntegrityError as e:
            print(f"Failed to create vehicle due to integrity error: {e}")

    serialized_data = VehicleSerializer(vehicles, many=True).data
    return serialized_data


def parse_excel_to_equipment(excel_file):
    df1 = pd.read_excel(excel_file, sheet_name=1, engine="openpyxl")

    equipments = []

    for index, row in df1.iterrows():
        if pd.isna(row["UNICODE"]):
            continue

        if Equipment.objects.filter(unicode_id=row["UNICODE"]).exists():
            print(
                f"Skipping equipment with UNICODE {row['UNICODE']} as it exists."
            )
            continue

        equipment_data = {
            "unicode_id": row["UNICODE"],
            "model_number": row["PREFIX"],
            "chassis_number": row["CHASSIS"],
            "engine_number": row["ENGINE NUMBER"],
            "description": row["DESCRIPTION"],
            "brand": row["BRAND"],
            "type": row["TYPE"],
            "location": row["LOCATION"],
            "classification_type": row["CLASSIFICATION TYPE"],
            "engine_condition": row["ENGINE CONDITION"],
            "transmission_condition": row["TRANSMISSION"],
            "differentials_condition": row["Differentials / Drive Train"],
            "brake_condition": row["BRAKES"],
            "electrical_condition": row["Electrical / Computer System"],
            "hydraulic_cylinder_condition": row["HYDRAULIC CYLINDER"],
            "hydraulic_hoses_and_chrome_condition": row["HYDRAULIC HOSES & CHROME"],
            "chassis_condition": row["Chassis / Undercarriage CONDITION"],
            "body_condition": row["Body CONDITION"],
        }
        brand_id = equipment_data.pop("brand", None)
        type_id = equipment_data.pop("type", None)
        brand = Brand.objects.filter(name=brand_id).first()
        if brand is None:
            brand = Brand.objects.create(name=brand_id)
        type = Type.objects.filter(name=type_id).first()
        if type is None:
            type = Type.objects.create(name=type_id)

        if brand is None or type is None:
            continue
        equipment, created = Equipment.objects.get_or_create(
            brand=brand, type=type, **equipment_data
        )

        equipments.append(equipment)
    serialized_data = EquipmentSerializer(equipments, many=True).data
    return serialized_data


def parse_excel_to_trailer(excel_file):
    df2 = pd.read_excel(excel_file, sheet_name=2, engine="openpyxl")
    trailers = []

    for index, row in df2.iterrows():
        if pd.isna(row["UNICODE"]):
            continue

        if Trailer.objects.filter(unicode_id=row["UNICODE"]).exists():
            print(
                f"Skipping trailer with UNICODE {row['UNICODE']} as it already exists."
            )
            continue

        try:
            number_of_axles = int(row["NO OF AXLE"])
        except ValueError:
            print(f"Skipping row {index} due to conversion error in 'NO OF AXLE'")
            continue

        trailer_data = {
            "unicode_id": row["UNICODE"],
            "model_number": row["CHASSIS/SERIAL"],
            "description": row["DESCRIPTION"],
            "number_of_axles": number_of_axles,
        }

        supplier_name = row["SUPPLIER"]
        type_name = row["TRAILER TYPE"]

        supplier, _ = Supplier.objects.get_or_create(name=supplier_name)
        type, _ = Type.objects.get_or_create(name=type_name)

        trailer, created = Trailer.objects.get_or_create(
            supplier=supplier, type=type, **trailer_data
        )
        trailers.append(trailer)

    serialized_data = TrailerSerializer(trailers, many=True).data
    return serialized_data

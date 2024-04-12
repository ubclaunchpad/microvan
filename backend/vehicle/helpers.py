import pandas as pd
import requests
from django.shortcuts import get_object_or_404

from .models import Brand, Equipment, Supplier, Trailer, Type, UnitImage, Vehicle
from .serializers import VehicleSerializer


def parse_excel_to_vehicle(excel_file):
    df0 = pd.read_excel(excel_file, sheet_name=0, engine="openpyxl")

    vehicles = []

    for index, row in df0.iterrows():
        if pd.isna(row.iloc[2]) or pd.isna(row.iloc[19]) or pd.isna(row.iloc[1]):
            continue

        vehicle_data = {
            "unicode_id": row["UNICODE"],
            "model_number": row["MODEL"],
            "chassis_number": row["CHASSIS"],
            "engine_number": row["ENGINE NUMBER"],
            "description": row["DESCRIPTION"],
            "brand": row["BRAND"],
            "type": row["TYPE"],
            "minimum_price": row["SALE PRICE (PhP)"],
            # "is_sold": row[""],
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
        brand_id = vehicle_data.pop("brand", None)
        type_id = vehicle_data.pop("type", None)
        brand = Brand.objects.filter(name=brand_id).first()
        if brand is None:
            brand = Brand.objects.create(name=brand_id)
        type = Type.objects.filter(name=type_id).first()
        if type is None:
            type = Type.objects.create(name=type_id)

        if brand is None or type is None:
            continue
        vehicle, created = Vehicle.objects.get_or_create(
            brand=brand, type=type, **vehicle_data
        )

        vehicles.append(vehicle)
    serialized_data = VehicleSerializer(vehicles, many=True).data
    return serialized_data


def parse_excel_to_equipment(excel_file):
    df1 = pd.read_excel(excel_file, sheet_name=1)

    # empty list to store Equipment object
    equipments = []

    # Creating a while loop
    # initializing flag for end of file
    not_end_of_file = True

    # iterate through rows in dataframe using a while loop
    while not_end_of_file:
        for index, row in df1.iterrows():
            # ignore first column, check if second column is empty
            if pd.isna(row.iloc[1]):
                not_end_of_file = False
                break  # exit the for loop

            # create an equipment object for each row and append it to the list
            equipment_data = {}
            # figure out the api endpoint url
            response = requests.post("your_api_endpoint_url_here", json=equipment_data)
            if response.status_code == 201:
                # Append the created equipment data to the list
                equipments.append(response.json())
            else:
                # Handle the case where the request was not successful
                print(
                    f"Failed to create equipment. Status code: {response.status_code}"
                )

    return equipments


def parse_excel_to_trailer(excel_file):
    df2 = pd.read_excel(excel_file, sheet_name=2)

    # empty list to store Trailer object
    trailers = []

    # Creating a while loop
    # initializing flag for end of file
    not_end_of_file = True

    # iterate through rows in dataframe using a while loop
    while not_end_of_file:
        for index, row in df2.iterrows():
            # ignore first column, check if second column is empty
            if pd.isna(row.iloc[1]):
                not_end_of_file = False
                break  # exit the for loop

            # create a trailer object for each row and append it to the list
            trailer_data = {
                "unicode_id": row["UNICODE"],
                "chassis_number": row["CHASSIS/SERIAL"],
                "description": row["DESCRIPTION"],
                "supplier": row["SUPPLIER"],
                "trailer_type": row["TRAILER TYPE"],
                "number_of_axles": row["NO OF AXLE"],
            }
            # figure out the api endpoint url
            response = requests.post("your_api_endpoint_url_here", json=trailer_data)
            if response.status_code == 201:
                # Append the created trailer data to the list
                trailers.append(response.json())
            else:
                # Handle the case where the request was not successful
                print(
                    f"Failed to create equipment. Status code: {response.status_code}"
                )
    return trailers

# these are scripts to parse the data from the excel file

# import pandas
import pandas as pd
import requests

# define excel file
excel_file = "INVENTORY-CLASSIFICATION-2023-03-02.xlsx"

# to reference classes in models
from .models import Brand, Equipment, Supplier, Trailer, Type, UnitImage, Vehicle
from .serializers import (
    BrandSerializer,
    EquipmentSerializer,
    SupplierSerializer,
    TrailerSerializer,
    TypeSerializer,
    UnitImageSerializer,
    VehicleSerializer,
)

# vehicle script:


# define dataframe, read for LIST OF UNIT worksheet
def parse_excel_to_vehicle(excel_file):
    df0 = pd.read_excel(excel_file, sheet_name=0)

    # empty list to store Vehicle object
    vehicles = []

    # Creating a while loop
    # initializing flag for end of file
    not_end_of_file = True

    # iterate through rows in dataframe using a while loop
    while not_end_of_file:
        for index, row in df0.iterrows():
            # ignore first column, check if second column is empty
            if pd.isna(row.iloc[1]):
                not_end_of_file = False
                break  # exit the for loop

            # create a vehicle object for each row and append it to the list
            # vehicle = Vehicle(row)
            vehicle_data = {
                "unicode_id": row["UNICODE"],
                "model_number": row["MODEL"],
                "chassis_number": row["CHASSIS"],
                "description": row["DESCRIPTION"],
                "brand": row["BRAND"],
                "vehicle_type": row["TYPE"],
                "minimum_price": row["SALE PRICE (PhP)"],
                "is_sold": row[""],
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
                "body_condition": row["Body"]
                # finish columns
            }
            # figure out the api endpoint url
            response = requests.post("your_api_endpoint_url_here", json=vehicle_data)
            if response.status_code == 201:
                # Append the created vehicle data to the list
                vehicles.append(response.json())
            else:
                # Handle the case where the request was not successful
                print(f"Failed to create vehicle. Status code: {response.status_code}")
            # vehicles.append(vehicle)

    return vehicles


# call the function to parse excel file and get list of vehicles from LIST OF UNIT
list_of_vehicles = parse_excel_to_vehicle(excel_file)

# to see contents of list from first worksheet
for vehicle in list_of_vehicles:
    print(vars(vehicle))


# equipment script:


# define dataframe, read for EQUIPMENT worksheet
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
            equipment_data = {
                "unicode_id": row["UNICODE"],
                "prefix_id": row["PREFIX"],
                "chassis_number": row["CHASSIS"],
                "engine_number": row["ENGINE NUMBER"],
                "description": row["DESCRIPTION"],
                "brand": row["BRAND"],
                "equipment_type": row["TYPE"],
                "location": row["LOCATION"],
                "classification_type": row["CLASSIFICATION TYPE"],
                "engine_condition": row["ENGINE CONDITION"],
                "transmission_condition": row["TRANSMISSION"],
                "differentials_condition": row["Differentials / Drive Train"],
                "brake_condition": row["BRAKES"],
                "electrical_condition": row["Electrical / Computer System"],
                "hydraulic_cylinder_condition": row["HYDRAULIC CONDITION"],
                "hydraulic_hoses_and_chrome_condition": row["HYDRAULIC HOSES & CHROME"],
                "chassis_condition": row["Chassis / Undercarriage CONDITION"],
                "body_condition": row["Body CONDITION"],
            }
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


# call the function to parse excel file and get list of equipment from EQUIPMENT
list_of_equipments = parse_excel_to_equipment(excel_file)

# to see contents of list from first worksheet
for equipment in list_of_equipments:
    print(vars(equipment))


# trailer script:


# define dataframe, read for TRAILER worksheet
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


# call the function to parse excel file and get list of trailers from TRAILER
list_of_trailers = parse_excel_to_trailer(excel_file)

# to see contents of list from third worksheet
for trailer in list_of_trailers:
    print(vars(trailer))

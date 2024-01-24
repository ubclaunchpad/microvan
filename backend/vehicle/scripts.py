# these are scripts to parse the data from the excel file

# import pandas
import pandas as pd

# define excel file
excel_file = "INVENTORY-CLASSIFICATION-2023-03-02.xlsx"

# to reference classes in models
import models

# vehicle script:

models.Vehicle


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
            # check if first column is empty
            if pd.isna(row.iloc[0]):
                not_end_of_file = False
                break  # exit the for loop

            # create a vehicle object for each row and append it to the list
            vehicle = models.Vehicle(row)
            vehicles.append(vehicle)

    return vehicles


# call the function to parse excel file and get list of vehicles from LIST OF UNIT
list_of_vehicles = parse_excel_to_vehicle(excel_file)

# to see contents of list from first worksheet
for vehicle in list_of_vehicles:
    print(vars(vehicle))


# equipment script:

models.Equipment


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
            # check if first column is empty
            if pd.isna(row.iloc[0]):
                not_end_of_file = False
                break  # exit the for loop

            # create an equipment object for each row and append it to the list
            equipment = models.Equipment(row)
            equipments.append(equipment)

    return equipments


# call the function to parse excel file and get list of equipment from EQUIPMENT
list_of_equipments = parse_excel_to_equipment(excel_file)

# to see contents of list from first worksheet
for equipment in list_of_equipments:
    print(vars(equipment))


# trailer script:

models.Trailer


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
            # check if first column is empty
            if pd.isna(row.iloc[0]):
                not_end_of_file = False
                break  # exit the for loop

            # create a trailer object for each row and append it to the list
            trailer = models.Trailer(row)
            trailers.append(trailer)

    return trailers


# call the function to parse excel file and get list of trailers from TRAILER
list_of_trailers = parse_excel_to_trailer(excel_file)

# to see contents of list from third worksheet
for trailer in list_of_trailers:
    print(vars(equipment))

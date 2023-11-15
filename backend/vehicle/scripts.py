# this is a script to parse the data from the excel file

# import pandas
import pandas as pd

# define excel file
excel_file = "INVENTORY-CLASSIFICATION-2023-03-02.xlsx"

# to reference classes in models
import models

models.Vehicle


# define dataframe, read for LIST OF UNIT worksheet
def parse_excel_to_vehicle(excel_file):
    df0 = pd.read_excel(excel_file, sheet_name=0)

    # empty list to store Vehicle objext
    vehicles = []

    # iterate through rows in dataframe
    for index, row in df0.iterrows():
        # create a vehicle object for each row and append it to the list
        vehicle = models.Vehicle(row)
        vehicles.append(vehicle)

    return vehicles


# call the function to parse excel file and get list of vehicles from LIST OF UNIT
list_of_vehicles = parse_excel_to_vehicle(excel_file)

# to see contents of list from first worksheet
for vehicle in list_of_vehicles:
    print(vars(vehicle))

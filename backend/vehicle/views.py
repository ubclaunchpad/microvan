from datetime import datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Brand, Type, Vehicle, Equipment, Supplier, Trailer, UnitImage
from .serializers import BrandSerializer, TypeSerializer, VehicleSerializer, EquipmentSerializer, SupplierSerializer, TrailerSerializer, UnitImageSerializer


# Create your views here.
class VehicleListApiView(APIView):
    def get(self, request, *args, **kwargs):
        """
        Get all auctions
        """
        vehicles = Vehicle.objects.all()
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Create the Vehicle with given vehicle data
        """
        data = {
            "unicode_id": request.data.get("unicode_id"),
            "model_number": request.data.get("model_number"),
            "chassis_number": request.data.get("chassis_number"),
            "description": request.data.get("description"),
            "brand": request.data.get("brand"),
            "vehicle_type": request.data.get("vehicle_type"),
            "minimum_price": request.data.get("minimum_price"),
            "is_sold": request.data.get("is_sold"),
            "remarks": request.data.get("remarks"),
            "classification_type": request.data.get("classification_type"),
            "engine_condition": request.data.get("engine_condition"),
            "transmission_condition": request.data.get("tansmission_condition"),
            "differentials_condition": request.data.get("differentials_condition"),
            "brake_condition": request.data.get("brake_condition"),
            "electrical_condition": request.data.get("electrical_condition"),
            "operating_system_condition": request.data.get("operating_system_condition"),
            "chassis_condition": request.data.get("chassis_condition"),
            "body_condition": request.data.get("body_condition"),
        }
        serializer = VehicleSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
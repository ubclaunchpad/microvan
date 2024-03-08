from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
import pandas as pd
from rest_framework.parsers import FileUploadParser
from rest_framework import permissions

from core.permissions import IsAdminUser, IsAuthenticated

from .helpers import has_more_data, infinite_filter, parse_excel_to_vehicle
from .models import Brand, Type, Vehicle
from .serializers import VehicleSerializer


# Create your views here.
class VehicleListApiView(APIView):
    serializer_class = VehicleSerializer

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get(self, request, *args, **kwargs):
        """
        Get all vehicles
        """
        vehicles = Vehicle.objects.all()
        serializer = VehicleSerializer(vehicles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Create the Vehicle with given vehicle data
        """
        data = request.data.copy()
        brand_id = data.pop("brand", None)
        type_id = data.pop("type", None)
        # Handling the possibility that brand or type IDs might not exist
        brand = get_object_or_404(Brand, id=brand_id) if brand_id else None
        vehicle_type = get_object_or_404(Type, id=type_id) if type_id else None

        vehicle = Vehicle.objects.create(brand=brand, vehicle_type=vehicle_type, **data)
        # Use the serializer class's data directly
        serialized_data = self.serializer_class(vehicle)
        return Response(serialized_data.data, status=status.HTTP_201_CREATED)


class VehicleDetailApiView(APIView):
    """
    Retrieve, update or delete a vehicle instance.
    """

    serializer_class = VehicleSerializer

    def get_permissions(self):
        if self.request.method == "PUT" or self.request.method == "DELETE":
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get(self, request, vehicle_id, *args, **kwargs):
        """
        Get specific vehicle
        """
        try:
            vehicle = get_object_or_404(Vehicle, id=vehicle_id)
            serializer = VehicleSerializer(vehicle)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except vehicle.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, vehicle_id, format=None):
        """
        Update specific vehicle
        """
        vehicle = get_object_or_404(Vehicle, id=vehicle_id)
        serializer = VehicleSerializer(vehicle, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, vehicle_id, format=None):
        """
        Delete specific vehicle
        """
        vehicle = get_object_or_404(Vehicle, id=vehicle_id)
        vehicle.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class VehicleFilterList(APIView):
    """
    Get list of vehicles based off of filter
    Takes limit + offset from url
    """

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = infinite_filter(self.request)
        return queryset

    def get(self, request):
        url_parameter = request.GET.get("search")
        if url_parameter:
            vehicles = self.get_queryset()

            serialized_data = VehicleSerializer(vehicles, many=True)

            return Response(
                {"vehicles": serialized_data.data, "more_data": has_more_data(request)}
            )

        return Response(VehicleSerializer(Vehicle.objects.all()[:10], many=True).data)


class VehiclePriceApiView(APIView):
    """
    Update a vehicle's minimum price
    """

    permission_classes = [IsAdminUser]

    serializer_class = VehicleSerializer

    def put(self, request, vehicle_id, format=None):
        """
        Update specific vehicle price
        """
        vehicle = get_object_or_404(Vehicle, id=vehicle_id)

        new_price = request.data.get("minimum_price")
        if new_price is None:
            return Response(
                {"error": "Must provide minimum price"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = VehicleSerializer(
            vehicle, data={"minimum_price": new_price}, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UploadFileView(APIView):
    permission_classes = [permissions.AllowAny]
    parser_classes = [FileUploadParser]
    serializer_class = VehicleSerializer

    def post(self, request):
        try:
            file_obj = request.data['file']
            file_content = file_obj.read()
            data = parse_excel_to_vehicle(file_content)
            return Response({'status': 'success', 'message': data})
        except Exception as e:
            error_message = str(e)
            return Response({'status': 'error', 'message': error_message})
        

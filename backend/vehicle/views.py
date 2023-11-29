from datetime import datetime

from rest_framework import generics, status, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from .helpers import has_more_data, infinite_filter
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


# Create your views here.
class VehicleListApiView(APIView):
    serializer_class = VehicleSerializer

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
    serializer_class = VehicleSerializer
    """
    Retrieve, update or delete a vehicle instance.
    """

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


class VehicleFilterList(APIView):
    """
    Get list of vehicles based off of filter
    Takes limit + offset from url
    """

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

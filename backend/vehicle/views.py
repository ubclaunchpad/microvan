from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Vehicle, Brand, Type
from .serializers import VehicleSerializer


class VehicleAPIView(APIView):
    serializer_class = VehicleSerializer

    def get(self, request, *args, **kwargs):
        """
        Get specific vehicle
        """
        identifier = request.data.get("id")
        vehicle = Vehicle.objects.get(id=identifier)
        serialized_data = self.serializer_class(vehicle)
        try:
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        except vehicle.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        data = request.data
        brand_id = data.get("brand")
        type_id = data.get("type")
        data.pop("brand")
        data.pop("type")
        brand = Brand.objects.get(id=brand_id)
        type = Type.objects.get(id=type_id)
        vehicle = Vehicle.objects.create(**data, brand=brand, vehicle_type=type)
        serialized_data = self.serializer_class(vehicle)
        return Response(serialized_data.data, status=status.HTTP_200_OK)

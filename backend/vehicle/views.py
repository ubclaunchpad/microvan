from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Vehicle
from .serializers import VehicleSerializer


class VehicleAPIView(APIView):
    serializer_class = VehicleSerializer
    def get(self, request, *args, **kwargs):
        """
        Get specific vehicle
        """
        identifier = request.data.get("identifier")
        vehicle = Vehicle.objects.get(identifier=identifier)
        serialized_data = self.serializer_class(vehicle)
        try:
            return Response(serialized_data.data, status=status.HTTP_200_OK)
        except vehicle.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request, *args, **kwargs):
        data = request.data.get("data")
        unicode_id = data.get("unicode_id")
        vehicle = Vehicle.objects.create(unicode_id=unicode_id)
        serialized_data = self.serializer_class(vehicle)
        return Response(serialized_data.data, status=status.HTTP_200_OK)
"""
class UpdateVehicle(generics.UpdateAPIView):
    serializer_class = VehicleSerializer
    
    def patch(self, request):

"""


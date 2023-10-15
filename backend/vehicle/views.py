from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from vehicle.models import Vehicle, VehicleType
# Create your views here.
class VehicleAPIView(APIView):
    def get(self, request):
        vehicle_id = request.data.get("vehicle_id")
        vehicle = Vehicle.objects.get(identifier=vehicle_id)
        
        return Response(vehicle)
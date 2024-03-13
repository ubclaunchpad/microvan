from datetime import datetime

from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import IsAdminUser, IsAuthenticated
from services.AWSCognitoService import AWSCognitoService
from vehicle.models import SavedUnits, Vehicle, Equipment, Trailer

from .models import Auction, AuctionItem
from .serializers import AuctionSerializer


class AuctionListApiView(APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    def get(self, request, *args, **kwargs):
        """
        Get all auctions
        """
        auctions = Auction.objects.all()
        serializer = AuctionSerializer(auctions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Create the Auction with given auction data
        """
        date_format = "%Y-%m-%d"

        # Check if start_date and end_date are provided
        if (
            request.data.get("start_date") is None
            or request.data.get("end_date") is None
        ):
            return Response(
                {"error": "Start date and end date are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        start_date = datetime.strptime(request.data.get("start_date"), date_format)
        end_date = datetime.strptime(request.data.get("end_date"), date_format)

        # Check if start date is in the past
        if start_date.date() < datetime.now().date():
            return Response(
                {"error": "Start date should be in the future"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check if end date is before start date
        if end_date < start_date:
            return Response(
                {"error": "End date should be after start date"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = {
            "name": request.data.get("name"),
            "start_date": start_date,
            "end_date": end_date,
        }
        serializer = AuctionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuctionDetailApiView(APIView):
    """
    Retrieve, update or delete an auction instance.
    """

    def get_permissions(self):
        if self.request.method == "PUT" or self.request.method == "DELETE":
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get(self, request, auction_id, format=None):
        auction = get_object_or_404(Auction, id=auction_id)
        serializer = AuctionSerializer(auction)
        return Response(serializer.data)

    def put(self, request, auction_id, format=None):
        auction = get_object_or_404(Auction, id=auction_id)
        serializer = AuctionSerializer(auction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, auction_id, format=None):
        auction = get_object_or_404(Auction, id=auction_id)
        auction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SaveUnitApiView(APIView):
    """
    An endpoint to handle saving a vehicle to a bidder's saved vehicle list,
    as well as retrieving a list of all saved vehicles
    """

    permission_classes = [IsAuthenticated]

    cognitoService = AWSCognitoService()

    def post(self, request, **kwargs):
        bidder_id = kwargs.get("bidder_id")
        vehicle_id = kwargs.get("vehicle_id")
        auction_id = kwargs.get("auction_id")

        # Replace this later to fetch authentication details
        # from headers instead of body
        vehicle = get_object_or_404(Vehicle, id=vehicle_id)
        auction_for_vehicle = Auction.objects.get(id=auction_id)
        bidder = self.cognitoService.get_user_details(bidder_id)
        if SavedUnits.objects.filter(
            auction_id=auction_for_vehicle, bidder_id=bidder, object_id=vehicle.id
        ):
            return Response(
                {"message": "Vehicle already saved"},
                status=status.HTTP_204_NO_CONTENT,
            )

        saved_unit = SavedUnits(
            auction_id=auction_for_vehicle,
            bidder_id=bidder,
            object_id=vehicle.id,
            content_object=vehicle,
        )
        saved_unit.save()
        return Response(
            {"message": "Vehicle saved successfully"},
            status=status.HTTP_200_OK,
        )

    def delete(self, request, **kwargs):
        vehicle_id = kwargs.get("vehicle_id")
        bidder_id = kwargs.get("bidder_id")
        auction = kwargs.get("auction_id")
        bidder = self.cognitoService.get_user_details(bidder_id)

        saved_unit = get_object_or_404(
            SavedUnits, object_id=vehicle_id, bidder_id=bidder, auction_id=auction
        )

        saved_unit.delete()

        return Response(
            {"message": "Saved unit deleted successfully"},
            status=status.HTTP_200_OK,
        )


class GetSavedUnitApiView(APIView):
    """
    An endpoint to retrieve all of bidder's saved units associated with
    a provided auction
    """

    permission_classes = [IsAuthenticated]

    cognitoService = AWSCognitoService()

    def get(self, request, **kwargs):
        bidder_id = kwargs.get("bidder_id")
        auction_id = kwargs.get("auction_id")
        bidder = self.cognitoService.get_user_details(bidder_id)
        auction = get_object_or_404(Auction, id=auction_id)

        saved_units = SavedUnits.objects.filter(bidder_id=bidder, auction_id=auction)
        vehicle_list = [
            saved_unit.content_object
            for saved_unit in saved_units
            if isinstance(saved_unit.content_object, Vehicle)
        ]

        vehicle_data = [{"id": vehicle.id} for vehicle in vehicle_list]

        return Response({"vehicles": vehicle_data}, status=status.HTTP_200_OK)


class AddToAuctionApiView(APIView):
    """
    Takes in a vehicle and auction ID and associates
    it with an auction by creating an AuctionItem
    """

    permission_classes = [IsAdminUser]

    def post(self, request, *args, **kwargs):
        auction_id = kwargs.get("auction_id")
        vehicle_id = kwargs.get("vehicle_id")

        auction = get_object_or_404(Auction, id=auction_id)
        vehicle = get_object_or_404(Vehicle, id=vehicle_id)

        auction_item = AuctionItem(auction_id=auction, content_object=vehicle)
        auction_item.save()

        return Response(
            {"message": "Vehicle added to auction successfully"},
            status=status.HTTP_201_CREATED,
        )
    
class AuctionVehiclesApiView(APIView):
    """
    An endpoint to retrieve an auction's associated vehicles
    """

    cognitoService = AWSCognitoService()

    def get(self, request, **kwargs):
        auction_id = kwargs.get("auction_id")
        auction = get_object_or_404(Auction, id=auction_id)

        auction_items = AuctionItem.objects.filter(auction_id=auction)
        
        vehicle_list = []
        equipment_list = []
        trailer_list = []

        for auction_item in auction_items:
            if isinstance(auction_item.content_object, Vehicle):
                vehicle_list.append(auction_item.content_object)
            elif isinstance(auction_item.content_object, Equipment):
                equipment_list.append(auction_item.content_object)
            elif isinstance(auction_item.content_object, Trailer):
                trailer_list.append(auction_item.content_object)

        vehicle_data = [{"id": vehicle.id} for vehicle in vehicle_list]
        equipment_data = [{"id": equipment.id} for equipment in equipment_list]
        trailer_data = [{"id": trailer.id} for trailer in trailer_list]
        
        return Response({"vehicles": vehicle_data, "equipment": equipment_data, 
                         "trailers": trailer_data}, status=status.HTTP_200_OK)


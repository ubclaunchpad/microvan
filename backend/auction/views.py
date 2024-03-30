from datetime import timedelta

from django.contrib.contenttypes.models import ContentType
from django.db.models import Prefetch
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import IsAdminUser
from services.AWSCognitoService import AWSCognitoService
from user.serializers import UserSerializer
from vehicle.models import Equipment, SavedUnits, Trailer, Vehicle
from vehicle.serializers import (
    EquipmentSerializer,
    TrailerSerializer,
    VehicleSerializer,
)

from .models import Auction, AuctionDay, AuctionItem, AuctionVerifiedUser
from .serializers import AuctionSerializer


class AuctionListApiView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        """
        Get all auctions with counts of different types of items.
        """
        auctions = Auction.objects.all().prefetch_related(
            Prefetch(
                "days",
                queryset=AuctionDay.objects.prefetch_related(
                    Prefetch(
                        "items",
                        queryset=AuctionItem.objects.select_related("content_object"),
                    )
                ),
            )
        )

        auctions_data = []
        for auction in auctions:
            truck_count = 0
            equipment_count = 0
            trailer_count = 0

            for day in auction.days.all():
                for item in day.items.all():
                    if isinstance(item.content_object, Vehicle):
                        truck_count += 1
                    elif isinstance(item.content_object, Equipment):
                        equipment_count += 1
                    elif isinstance(item.content_object, Trailer):
                        trailer_count += 1

            auction_data = AuctionSerializer(auction).data
            auction_data.update(
                {
                    "truck_count": truck_count,
                    "equipment_count": equipment_count,
                    "trailer_count": trailer_count,
                }
            )

            auctions_data.append(auction_data)

        return Response(auctions_data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Create an Auction with given data, including start and end times, 
        and create AuctionDay models for every day between start_date and end_date inclusive.
        """
        serializer = AuctionSerializer(data=request.data)
        if serializer.is_valid():
            auction = serializer.save() 

            start_date = auction.start_date.date()
            end_date = auction.end_date.date()
            delta = timedelta(days=1)
            current_date = start_date

            while current_date <= end_date:
                AuctionDay.objects.create(auction=auction, date=current_date)
                current_date += delta

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
            self.permission_classes = [AllowAny]
        return super().get_permissions()

    def get(self, request, auction_id, *args, **kwargs):
        auction_day_date = request.query_params.get("date")

        auction = get_object_or_404(Auction, id=auction_id)

        if auction_day_date:
            auction_day = get_object_or_404(
                AuctionDay, auction=auction, date=auction_day_date
            )
            items = AuctionItem.objects.filter(auction_day=auction_day).select_related(
                "content_object"
            )

            vehicles = [
                VehicleSerializer(item.content_object).data
                for item in items
                if isinstance(item.content_object, Vehicle)
            ]
            equipment = [
                EquipmentSerializer(item.content_object).data
                for item in items
                if isinstance(item.content_object, Equipment)
            ]
            trailers = [
                TrailerSerializer(item.content_object).data
                for item in items
                if isinstance(item.content_object, Trailer)
            ]

            return Response(
                {
                    "auction": AuctionSerializer(auction).data,
                    "auction_day": {
                        "date": auction_day_date,
                        "vehicles": vehicles,
                        "equipment": equipment,
                        "trailers": trailers,
                    },
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {
                    "auction": AuctionSerializer(auction).data,
                },
                status=status.HTTP_200_OK,
            )

    def put(self, request, auction_id, format=None):
        auction = get_object_or_404(Auction, pk=auction_id)
        serializer = AuctionSerializer(auction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, auction_id, format=None):
        auction = get_object_or_404(Auction, pk=auction_id)
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
    permission_classes = [IsAdminUser]

    def post(self, request, auction_id):
        auction_day_id = request.data.get("auction_day_id")
        content_type = request.data.get("content_type")
        object_ids = request.data.get("object_ids")

        if not all([auction_day_id, content_type, object_ids]):
            return Response(
                {"error": "Missing required fields."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            auction_day = AuctionDay.objects.get(id=auction_day_id)
            ct = ContentType.objects.get(model=content_type.lower())
            successes, failures = 0, 0

            for object_id in object_ids:
                try:
                    item = ct.get_object_for_this_type(id=object_id)
                    AuctionItem.objects.create(auction_day=auction_day, content_object=item)
                    successes += 1
                except Exception as inner_exception:
                    failures += 1

            if failures:
                return Response(
                    {"message": f"Items partially added to auction. Success: {successes}, Failures: {failures}"},
                    status=status.HTTP_207_MULTI_STATUS,
                )
            return Response(
                {"message": "All items added to auction successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AuctionVehiclesApiView(APIView):
    """
    An endpoint to retrieve an auction's associated vehicles
    """

    cognitoService = AWSCognitoService()

    def get(self, request, **kwargs):
        auction_day_id = kwargs.get("auction_day_id")
        auction_day = get_object_or_404(AuctionDay, id=auction_day_id)

        auction_items = AuctionItem.objects.filter(auction_day=auction_day)

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

        return Response(
            {
                "vehicles": vehicle_data,
                "equipment": equipment_data,
                "trailers": trailer_data,
            },
            status=status.HTTP_200_OK,
        )


class BidderVerificationApiView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, auction_id, *args, **kwargs):
        is_verified = request.query_params.get("verified") == "true"

        verified_users = (
            AuctionVerifiedUser.objects.filter(
                auction_id=auction_id, is_verified=is_verified
            )
            .select_related("user")
            .all()
        )

        user_data = [UserSerializer(user.user).data for user in verified_users]
        return Response(user_data, status=status.HTTP_200_OK)

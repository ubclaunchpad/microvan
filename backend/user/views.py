from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.contenttypes.models import ContentType
from .models import Admin, Bidder
from .serializers import (
    AdminSerializer,
    BidderBlacklistedSerializer,
    BidderSerializer,
    BidderVerifiedSerializer,
)
from vehicle.models import Vehicle, SavedUnits, Type, Brand
from vehicle.serializers import VehicleSerializer
from auction.models import Auction, AuctionItem


class BidderListApiView(APIView):
    def get(self, request):
        """
        Return a list of all bidders.
        """
        bidders = Bidder.objects.all()
        serializer = BidderSerializer(bidders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new bidder.
        """
        serializer = BidderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BidderDetailApiView(APIView):
    def get(self, request, bidder_id):
        """
        Return a single bidder.
        """
        bidder = get_object_or_404(Bidder, id=bidder_id)
        serializer = BidderSerializer(bidder)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, bidder_id):
        """
        Update a single bidder.
        """
        bidder = get_object_or_404(Bidder, id=bidder_id)
        serializer = BidderSerializer(bidder, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, bidder_id):
        """
        Delete a single bidder.
        """
        # TODO: User JWT Token to check that admin is making this request

        bidder = get_object_or_404(Bidder, id=bidder_id)
        bidder.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BidderVerifyApiView(APIView):
    def put(self, request, bidder_id):
        # TODO: User JWT Token to check that admin is making this request
        if "is_verified" not in request.data:
            return Response(
                {"error": "is_verified field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bidder = get_object_or_404(Bidder, id=bidder_id)

        serializer = BidderVerifiedSerializer(bidder, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BidderBlacklistApiView(APIView):
    def put(self, request, bidder_id):
        # TODO: User JWT Token to check that admin is making this request
        if "is_blacklisted" not in request.data:
            return Response(
                {"error": "is_blacklisted field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bidder = get_object_or_404(Bidder, id=bidder_id)

        serializer = BidderBlacklistedSerializer(
            bidder, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminListApiView(APIView):
    def get(self, request):
        """
        Return a list of all admins.
        """
        admins = Admin.objects.all()
        serializer = AdminSerializer(admins, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new admin.
        """
        serializer = AdminSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminDetailApiView(APIView):
    def get(self, request, admin_id):
        """
        Return a single admin.
        """
        admin = get_object_or_404(Admin, id=admin_id)
        serializer = AdminSerializer(admin)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, admin_id):
        """
        Update a single admin.
        """
        admin = get_object_or_404(Admin, id=admin_id)
        serializer = AdminSerializer(admin, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, admin_id):
        """
        Delete a single admin.
        """
        admin = get_object_or_404(Admin, id=admin_id)
        admin.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SaveUnitApiView(APIView):
    """
    An endpoint to handle saving a vehicle to a bidder's saved vehicle list,
    as well as retrieving a list of all saved vehicles
    """

    def get(self, request, **kwargs):
        # Replace this line to obtain user id once authentication has been implemented
        bidder_id = kwargs.get("bidder_id")
        bidder = get_object_or_404(Bidder, id=bidder_id)

        saved_units = SavedUnits.objects.filter(bidder_id=bidder)
        vehicle_list = [
            saved_unit.content_object
            for saved_unit in saved_units
            if isinstance(saved_unit.content_object, Vehicle)
        ]

        vehicle_data = [{"id": vehicle.id} for vehicle in vehicle_list]

        return Response({"vehicles": vehicle_data}, status=status.HTTP_200_OK)

    def post(self, request, **kwargs):
        bidder_id = kwargs.get("bidder_id")
        vehicle_id = kwargs.get("vehicle_id")
        # Replace this later to fetch authentication details
        # from headers instead of body
        vehicle = get_object_or_404(Vehicle, id=vehicle_id)
        auction_for_vehicle = Auction.objects.filter(
            auctionitem__content_type=ContentType.objects.get_for_model(Vehicle),
            auctionitem__object_id=vehicle.id,
        ).first()

        bidder = get_object_or_404(Bidder, id=bidder_id)
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

        bidder = get_object_or_404(Bidder, id=bidder_id)

        saved_unit = get_object_or_404(
            SavedUnits, object_id=vehicle_id, bidder_id=bidder
        )

        saved_unit.delete()

        return Response(
            {"message": "Saved unit deleted successfully"},
            status=status.HTTP_200_OK,
        )


class ListUnverified(APIView):
    def get(self, request):
        bidders = Bidder.objects.all()
        unverifiedBidders = []
        for index in range(len(bidders)):
            if bidders[index].is_verified is False:
                unverifiedBidders.append(bidders[index])
        serializer = BidderSerializer(unverifiedBidders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListBlacklisted(APIView):
    def get(self, request):
        bidders = Bidder.objects.all()
        blacklistedBidders = []
        for index in range(len(bidders)):
            if bidders[index].is_blacklisted is True:
                blacklistedBidders.append(bidders[index])
        serializer = BidderSerializer(blacklistedBidders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListVerified(APIView):
    def get(self, request):
        bidders = Bidder.objects.all()
        verifiedBidders = []
        for index in range(len(bidders)):
            if bidders[index].is_verified is True:
                verifiedBidders.append(bidders[index])
        serializer = BidderSerializer(verifiedBidders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

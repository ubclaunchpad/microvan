from datetime import datetime

from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Auction
from .serializers import AuctionSerializer


class AuctionListApiView(APIView):
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

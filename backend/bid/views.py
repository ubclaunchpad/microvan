from django.contrib.contenttypes.models import ContentType
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from auction.models import Auction
from user.models import User

from .models import Bid
from .serializers import BidSerializer


class BidListApiView(APIView):
    permission_classes = [IsAuthenticated]

    serializer_class = BidSerializer

    def get(self, request, *args, **kwargs):
        """
        Get all bids
        """
        bids = Bid.objects.all()
        serializer = BidSerializer(bids, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        """
        Create a bid
        """
        data = request.data
        amount = data.get("amount")
        bidder_id = data.get("bidder")
        auction_id = data.get("auction")
        content_type_name = data.get("content_type")
        object_id = data.get("object_id")

        # Check for missing fields
        if not all([amount, bidder_id, auction_id, content_type_name, object_id]):
            return Response(
                {"error": "Missing fields in request."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate ContentType
        try:
            content_type = ContentType.objects.get(model=content_type_name)
            if content_type_name not in ["vehicle", "equipment", "trailer"]:
                raise ValueError("Invalid content type")
        except (ContentType.DoesNotExist, ValueError):
            return Response(
                {"error": "Invalid content type."}, status=status.HTTP_400_BAD_REQUEST
            )

        # Validate bidder and auction
        try:
            bidder = User.objects.get(id=bidder_id)
            auction = Auction.objects.get(id=auction_id)
        except (User.DoesNotExist, Auction.DoesNotExist):
            return Response(
                {"error": "Invalid bidder or auction."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate object_id
        model_class = content_type.model_class()
        try:
            model_class.objects.get(id=object_id)
        except model_class.DoesNotExist:
            return Response(
                {"error": "Invalid object ID for the given content type."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        highest_bid = (
            Bid.objects.filter(
                content_type=content_type, object_id=data.get("object_id")
            )
            .order_by("-amount")
            .first()
        )
        if highest_bid and amount <= highest_bid.amount:
            return Response(
                {"error": "Your bid must be higher than the current highest bid."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bid = Bid.objects.create(
            amount=amount,
            bidder=bidder,
            auction=auction,
            content_type=content_type,
            object_id=object_id,
        )

        serialized_data = self.serializer_class(bid)
        return Response(serialized_data.data, status=status.HTTP_201_CREATED)


class BidDetailApiView(APIView):
    """
    Retrieve, update or delete an bid instance.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, bid_id, format=None):
        bid = get_object_or_404(Bid, id=bid_id)
        serializer = BidSerializer(bid)
        return Response(serializer.data)

    def put(self, request, bid_id, format=None):
        bid = get_object_or_404(Bid, id=bid_id)
        serializer = BidSerializer(bid, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, bid_id, format=None):
        bid = get_object_or_404(Bid, id=bid_id)
        bid.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

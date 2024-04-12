from django.apps import apps
from django.contrib.contenttypes.models import ContentType
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from auction.models import Auction, AuctionDay
from services.AWSCognitoService import AWSCognitoService

from .models import Bid
from .serializers import BidSerializer


class BidListApiView(APIView):
    permission_classes = [IsAuthenticated]

    serializer_class = BidSerializer
    cognitoService = AWSCognitoService()

    def post(self, request, *args, **kwargs):
        data = request.data
        item_type = data.get("content_type", "truck")

        model_map = {
            "truck": "vehicle",
            "equipment": "equipment",
            "trailer": "trailer",
        }
        model_name = model_map.get(item_type, "vehicle")

        try:
            model = apps.get_model(app_label="vehicle", model_name=model_name)
            content_type = ContentType.objects.get_for_model(model)
        except (LookupError, ContentType.DoesNotExist):
            return Response(
                {"error": "Invalid content type."}, status=status.HTTP_400_BAD_REQUEST
            )

        required_fields = ["amount", "bidder_id", "auction_id", "object_id"]
        if not all(field in data for field in required_fields):
            return Response(
                {"error": "Missing fields in request."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bidder = self.cognitoService.get_user_details(data.get("bidder_id"))
        if not bidder:
            return Response(
                {"error": "Invalid bidder."}, status=status.HTTP_400_BAD_REQUEST
            )

        item = get_object_or_404(model, id=data.get("object_id"))

        highest_bid = Bid.objects.filter(object_id=item.id).order_by("-amount").first()
        if highest_bid is None:
            if int(data["amount"]) < item.starting_price:
                return Response(
                    {"error": "Your bid must be higher than the starting price."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        elif highest_bid and int(data["amount"]) <= highest_bid.amount:
            return Response(
                {"error": "Your bid must be higher than the current highest bid."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bid = Bid.objects.create(
            amount=data["amount"],
            bidder=data["bidder_id"],
            auction_id=data["auction_id"],
            auction_day_id=data.get("auction_day_id"),
            content_type=content_type,
            object_id=data["object_id"],
        )

        serialized_data = self.serializer_class(bid)
        return Response(serialized_data.data, status=status.HTTP_201_CREATED)


class BidDetailApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, bid_id, format=None):
        bid = get_object_or_404(Bid, id=bid_id)
        serializer = BidSerializer(bid)
        return Response(serializer.data)

    def put(self, request, bid_id, format=None):
        bid = get_object_or_404(Bid, id=bid_id)
        serializer = BidSerializer(bid, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, bid_id, format=None):
        bid = get_object_or_404(Bid, id=bid_id)
        bid.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

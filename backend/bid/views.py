# Add endpoint for placing bid on vehicle
# Bidder should be able to place a bid if they are not the top bidder of the vehicle

from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Bid
from .serializers import BidSerializer


class BidListApiView(APIView):
    def get(self, request, *args, **kwargs):
        """
        Get all bids
        """
        bids = Bid.objects.all()
        serializer = BidSerializer(bids, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    """
    API endpoint to make a bid on an object
    """
    def post(self, request, *args, **kwargs):
        data = request.data
        amount = data.get('amount') 
        bidder = data.get('bidder')
        auction = data.get('auction')
        content_type = data.get('content_type')
        object_id = data.get('object_id')  

        # Check for missing fields
        if not amount or bidder or auction or content_type or object_id is None:
            return Response({'error': 'Bid amount, bidder, auction, content type, and object ID are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Check for the highest bid for the given vehicle
        highest_bid = Bid.objects.filter(object_id=object_id).order_by('-amount').first()

        # Check if the new bid is higher than the highest bid
        if highest_bid and amount <= highest_bid.amount:
            return Response({'error': 'Your bid must be higher than the current highest bid.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Create the new bid
        serializer = BidSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BidDetailApiView(APIView):
    """
    Retrieve, update or delete an bid instance.
    """

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
    
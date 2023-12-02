from django.shortcuts import render

# separate endpoints to fetch all bidders and admins

from .models import Admin

from .models import Bidder


# Create your views here.
class BiddersListApiView(APIView):
    def get(self, request, *args, **kwargs):
        """
        Fetch all bidders
        """
        bidders = Bidder.objects.all()
        serializer = BidderSerializer(bidders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AdminsListApiView(APIView):
    def get(self, request, *args, **kwargs):
        """
        Fetch all admins
        """
        bidders = Bidder.objects.all()
        serializer = BidderSerializer(bidders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

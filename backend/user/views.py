from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Admin, Bidder
from .serializers import (
    AdminSerializer,
    BidderBlacklistedSerializer,
    BidderSerializer,
    BidderVerifiedSerializer,
)


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

from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.hashers import make_password

from core.permissions import IsAdminUser

from .models import User
from .serializers import (
    AdminSerializer, BidderBlacklistedSerializer, BidderSerializer,
    BidderVerifiedSerializer, MyTokenObtainPairSerializer)


class BidderListApiView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    def get(self, request):
        """
        Return a list of all bidders.
        """
        bidders = User.objects.all().filter(is_admin=False)
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
    def get_permissions(self):
        if self.request.method == "DELETE":
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get(self, request, bidder_id):
        """
        Return a single bidder.
        """
        bidder = get_object_or_404(User, id=bidder_id)
        serializer = BidderSerializer(bidder)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, bidder_id):
        """
        Update a single bidder.
        """
        bidder = get_object_or_404(User, id=bidder_id)
        serializer = BidderSerializer(bidder, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, bidder_id):
        """
        Delete a single bidder.
        """
        bidder = get_object_or_404(User, id=bidder_id)
        bidder.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BidderVerifyApiView(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, bidder_id):
        if "is_verified" not in request.data:
            return Response(
                {"error": "is_verified field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bidder = get_object_or_404(User, id=bidder_id)

        serializer = BidderVerifiedSerializer(bidder, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BidderBlacklistApiView(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, bidder_id):
        if "is_blacklisted" not in request.data:
            return Response(
                {"error": "is_blacklisted field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        bidder = get_object_or_404(User, id=bidder_id)

        serializer = BidderBlacklistedSerializer(
            bidder, data=request.data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminListApiView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        """
        Return a list of all admins.
        """
        admins = User.objects.all().filter(is_admin=True)
        serializer = AdminSerializer(admins, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Create a new admin.
        """
        serializer = AdminSerializer(data=request.data, is_admin=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdminDetailApiView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, admin_id):
        """
        Return a single admin.
        """
        admin = get_object_or_404(User, id=admin_id)
        serializer = AdminSerializer(admin)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, admin_id):
        """
        Update a single admin.
        """
        admin = get_object_or_404(User, id=admin_id)
        serializer = AdminSerializer(admin, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, admin_id):
        """
        Delete a single admin.
        """
        admin = get_object_or_404(User, id=admin_id)
        admin.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ListUnverified(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        bidders = User.objects.all().filter(is_admin=False)
        unverifiedBidders = []
        for index in range(len(bidders)):
            if bidders[index].is_verified is False:
                unverifiedBidders.append(bidders[index])
        serializer = BidderSerializer(unverifiedBidders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListBlacklisted(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        bidders = User.objects.all().filter(is_admin=False)
        blacklistedBidders = []
        for index in range(len(bidders)):
            if bidders[index].is_blacklisted is True:
                blacklistedBidders.append(bidders[index])
        serializer = BidderSerializer(blacklistedBidders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ListVerified(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        bidders = User.objects.all().filter(is_admin=False)
        verifiedBidders = []
        for index in range(len(bidders)):
            if bidders[index].is_verified is True:
                verifiedBidders.append(bidders[index])
        serializer = BidderSerializer(verifiedBidders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
"""
    def post(self, request):
        # Create a user instance
        user = User(
            username="kevin222",
            email="test2222@gmail.com",
            first_name="123",
            last_name="123",
            password=make_password("123")  # Hash the password
        )

        # Save the user
        user.save()

        return Response("User created successfully.")
"""
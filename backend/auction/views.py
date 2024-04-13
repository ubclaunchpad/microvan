from datetime import datetime, time, timedelta

from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator
from django.db.models import Prefetch, Q
from django.utils import timezone
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
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
from .serializers import AuctionSerializer, AuctionVerifiedUserSerializer


class AuctionListApiView(APIView):
    def get_authenticators(self):
        if self.request.method == "GET":
            self.authentication_classes = []
        return super().get_authenticators()

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()

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
                        queryset=AuctionItem.objects.select_related("content_type"),
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
        and create AuctionDay models for every day between start_date and
        end_date inclusive.
        """
        serializer = AuctionSerializer(data=request.data)
        if serializer.is_valid():
            auction = serializer.save()

            start_datetime = datetime.combine(auction.start_date.date(), time())
            end_datetime = datetime.combine(auction.end_date.date(), time())
            delta = timedelta(days=1)
            current_date = start_datetime

            while current_date <= end_datetime:
                AuctionDay.objects.create(auction=auction, date=current_date.date())
                current_date += delta

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AuctionDayApiView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, auction_id, *args, **kwargs):
        auction = get_object_or_404(Auction, id=auction_id)
        auction_days = AuctionDay.objects.filter(auction=auction)
        auction_days_data = []
        for auction_day in auction_days:
            auction_day_data = {
                "id": auction_day.id,
                "date": auction_day.date,
            }
            auction_days_data.append(auction_day_data)
        return Response(auction_days_data, status=status.HTTP_200_OK)


class CurrentAuctionApiView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        """
        Get the current auction with counts of different types of items.
        """
        today = timezone.now().date()
        current_auctions = Auction.objects.filter(
            start_date__lte=today, end_date__gte=today
        ).prefetch_related(
            Prefetch(
                "days",
                queryset=AuctionDay.objects.prefetch_related(
                    Prefetch(
                        "items",
                        queryset=AuctionItem.objects.select_related("content_type"),
                    )
                ),
            )
        )

        if not current_auctions.exists():
            return Response(
                status=status.HTTP_204_NO_CONTENT,
            )

        current_auction = current_auctions.first()

        truck_count = 0
        equipment_count = 0
        trailer_count = 0

        for day in current_auction.days.all():
            for item in day.items.all():
                if isinstance(item.content_object, Vehicle):
                    truck_count += 1
                elif isinstance(item.content_object, Equipment):
                    equipment_count += 1
                elif isinstance(item.content_object, Trailer):
                    trailer_count += 1

        serialized_data = AuctionSerializer(current_auction).data
        serialized_data.update(
            {
                "truck_count": truck_count,
                "equipment_count": equipment_count,
                "trailer_count": trailer_count,
            }
        )

        return Response(
            serialized_data,
            status=status.HTTP_200_OK,
        )


class PastAuctionsApiView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        """
        Get all past auctions with counts of different types of items.
        """
        today = timezone.now().date()
        past_auctions = Auction.objects.filter(end_date__lt=today).prefetch_related(
            Prefetch(
                "days",
                queryset=AuctionDay.objects.prefetch_related(
                    Prefetch(
                        "items",
                        queryset=AuctionItem.objects.select_related("content_type"),
                    )
                ),
            )
        )

        auctions_data = []
        for auction in past_auctions:
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


class UpcomingAuctionApiView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, *args, **kwargs):
        """
        Get the closest upcoming auction.
        """
        today = timezone.now().date()
        upcoming_auctions = (
            Auction.objects.filter(start_date__gt=today)
            .order_by("start_date")
            .prefetch_related(
                Prefetch(
                    "days",
                    queryset=AuctionDay.objects.prefetch_related(
                        Prefetch(
                            "items",
                            queryset=AuctionItem.objects.select_related("content_type"),
                        )
                    ),
                )
            )
        )

        if not upcoming_auctions.exists():
            return Response(
                status=status.HTTP_204_NO_CONTENT,
            )

        closest_auction = upcoming_auctions.first()

        truck_count = 0
        equipment_count = 0
        trailer_count = 0

        for day in closest_auction.days.all():
            for item in day.items.all():
                if isinstance(item.content_object, Vehicle):
                    truck_count += 1
                elif isinstance(item.content_object, Equipment):
                    equipment_count += 1
                elif isinstance(item.content_object, Trailer):
                    trailer_count += 1

        auction_data = AuctionSerializer(closest_auction).data
        auction_data.update(
            {
                "truck_count": truck_count,
                "equipment_count": equipment_count,
                "trailer_count": trailer_count,
            }
        )

        return Response(
            auction_data,
            status=status.HTTP_200_OK,
        )


class AuctionDetailApiView(APIView):
    """
    Retrieve, update or delete an auction instance.
    """

    def get_authenticators(self):
        if self.request.method == "GET":
            self.authentication_classes = []
        return super().get_authenticators()

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


class AuctionItemsApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get_filtered_queryset(self, model, auction_day_id, filters):
        """
        Filters the queryset of a given model based on the provided filters
        and the relation to AuctionItem through ContentType.
        """
        content_type = ContentType.objects.get_for_model(model)
        related_item_ids = AuctionItem.objects.filter(
            auction_day_id=auction_day_id, content_type=content_type
        ).values_list("object_id", flat=True)

        return model.objects.filter(id__in=related_item_ids, **filters)

    def get(self, request, auction_id, auction_day_id):
        item_type = request.query_params.get("item_type", None)
        type = request.query_params.get("type", None)
        brand_id = request.query_params.get("brand", None)
        min_price = request.query_params.get("min_price", None)
        max_price = request.query_params.get("max_price", None)
        search_term = request.query_params.get("search", None)

        filters = {}
        if type:
            filters["type"] = type
        if brand_id:
            filters["brand"] = brand_id
        if min_price:
            filters["current_price__gte"] = min_price
        if max_price:
            filters["current_price__lte"] = max_price
        if search_term:
            filters["description__icontains"] = search_term

        # Apply filters to each model's queryset
        if item_type == "trucks":
            combined_qs = self.get_filtered_queryset(Vehicle, auction_day_id, filters)
        elif item_type == "equipment":
            combined_qs = self.get_filtered_queryset(Equipment, auction_day_id, filters)
        elif item_type == "trailers":
            combined_qs = self.get_filtered_queryset(Trailer, auction_day_id, filters)
        else:
            vehicle_qs = self.get_filtered_queryset(Vehicle, auction_day_id, filters)
            equipment_qs = self.get_filtered_queryset(
                Equipment, auction_day_id, filters
            )
            trailer_qs = self.get_filtered_queryset(Trailer, auction_day_id, filters)

            combined_qs = list(vehicle_qs) + list(equipment_qs) + list(trailer_qs)

        # Implement custom pagination
        page_number = request.query_params.get("page", 1)
        paginator = Paginator(combined_qs, 5)
        page_obj = paginator.get_page(page_number)

        serialized_data = []
        for obj in page_obj:
            if isinstance(obj, Vehicle):
                serializer = VehicleSerializer(obj)
            elif isinstance(obj, Equipment):
                serializer = EquipmentSerializer(obj)
            elif isinstance(obj, Trailer):
                serializer = TrailerSerializer(obj)
            serialized_data.append(serializer.data)

        return Response(
            {
                "count": paginator.count,
                "next": page_obj.has_next(),
                "previous": page_obj.has_previous(),
                "results": serialized_data,
            }
        )

    def post(self, request, auction_id, auction_day_id):
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
                    AuctionItem.objects.create(
                        auction_day=auction_day, content_object=item
                    )
                    successes += 1
                except Exception:
                    failures += 1

            if failures:
                return Response(
                    {"message": "Items partially added to auction."},
                    status=status.HTTP_207_MULTI_STATUS,
                )
            return Response(
                {"message": "All items added to auction successfully"},
                status=status.HTTP_201_CREATED,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class BidderVerificationApiView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [IsAdminUser]
        return super().get_permissions()

    def get(self, request, auction_id, *args, **kwargs):
        bidder_id = request.query_params.get("bidder_id")
        is_verified_param = request.query_params.get("verified")

        query = Q(auction_id=auction_id)

        if bidder_id is not None:
            query &= Q(cognito_user_id=bidder_id)

        if is_verified_param is not None:
            is_verified = is_verified_param.lower() == "true"
            query &= Q(is_verified=is_verified)

        verified_users = AuctionVerifiedUser.objects.filter(query).all()

        serialized_data = AuctionVerifiedUserSerializer(verified_users, many=True)
        return Response(serialized_data.data, status=status.HTTP_200_OK)

    def post(self, request, auction_id):
        bidder_id = request.data.get("bidder_id")
        is_verified = request.data.get("is_verified")

        bidderVerification = AuctionVerifiedUser.objects.create(
            auction_id=auction_id, cognito_user_id=bidder_id, is_verified=is_verified
        )

        serialized_data = AuctionVerifiedUserSerializer(bidderVerification)
        return Response(serialized_data.data, status=status.HTTP_201_CREATED)

    def put(self, request, auction_id):
        bidder_id = request.data.get("bidder_id")
        is_verified = request.data.get("is_verified")

        bidderVerification = get_object_or_404(
            AuctionVerifiedUser, auction_id=auction_id, cognito_user_id=bidder_id
        )
        bidderVerification.is_verified = is_verified
        bidderVerification.save()

        serialized_data = AuctionVerifiedUserSerializer(bidderVerification)
        return Response(serialized_data.data, status=status.HTTP_200_OK)

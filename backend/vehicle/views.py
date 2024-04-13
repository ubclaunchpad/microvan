import pandas as pd
from django.db.models import Q
from rest_framework import permissions, status
from rest_framework.generics import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from core.permissions import IsAdminUser

from .helpers import (
    parse_excel_to_equipment,
    parse_excel_to_trailer,
    parse_excel_to_vehicle,
)
from .models import Brand, Equipment, Trailer, Type, Vehicle
from .serializers import (
    BrandSerializer,
    EquipmentSerializer,
    TrailerSerializer,
    TypeSerializer,
    VehicleSerializer,
)


class StandardResultsPagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = "page_size"
    max_page_size = 100


# Create your views here.
class ItemListApiView(APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [IsAdminUser]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get(self, request, *args, **kwargs):
        """
        Get a list of items filtered by type, brand, current price range,
        and search term. Supports pagination.
        """
        item_type = request.query_params.get("type", None)
        brand_id = request.query_params.get("brand", None)
        min_price = request.query_params.get("min_price", None)
        max_price = request.query_params.get("max_price", None)
        search_term = request.query_params.get("search", None)
        paginator = StandardResultsPagination()

        filters = Q()
        if brand_id:
            filters &= Q(brand_id=brand_id)
        if min_price:
            filters &= Q(current_price__gte=min_price)
        if max_price:
            filters &= Q(current_price__lte=max_price)
        if search_term:
            filters &= Q(description__icontains=search_term)

        if item_type is None:
            items_query = (
                Vehicle.objects.filter(filters)
                | Trailer.objects.filter(filters)
                | Equipment.objects.filter(filters)
            ).distinct()
        else:
            type_map = {
                "truck": Vehicle,
                "equipment": Equipment,
                "trailer": Trailer,
            }
            model_cls = type_map.get(item_type, Vehicle)
            items_query = model_cls.objects.filter(filters)

        page = paginator.paginate_queryset(items_query, request)
        if page is not None:
            serializer_cls = (
                VehicleSerializer
                if item_type == "truck"
                else TrailerSerializer
                if item_type == "trailer"
                else EquipmentSerializer
            )
            serialized_page = serializer_cls(
                page, many=True, context={"request": request}
            )
            return paginator.get_paginated_response(serialized_page.data)

        return Response(
            {"detail": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST
        )

    def post(self, request, *args, **kwargs):
        """
        Create the Vehicle with given vehicle data
        """
        data = request.data.copy()
        brand_id = data.pop("brand", None)
        type_id = data.pop("type", None)

        brand = get_object_or_404(Brand, id=brand_id) if brand_id else None
        vehicle_type = get_object_or_404(Type, id=type_id) if type_id else None

        vehicle = Vehicle.objects.create(brand=brand, type=vehicle_type, **data)

        serialized_data = self.serializer_class(vehicle)
        return Response(serialized_data.data, status=status.HTTP_201_CREATED)


class DetailApiView(APIView):
    def get_permissions(self):
        if self.request.method in ["DELETE"]:
            self.permission_classes = [permissions.IsAdminUser]
        else:
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def get_serializer_class(self, item_type):
        serializer_map = {
            "truck": VehicleSerializer,
            "equipment": EquipmentSerializer,
            "trailer": TrailerSerializer,
        }
        return serializer_map.get(item_type, VehicleSerializer)

    def get_object(self, item_id, item_type):
        model_map = {
            "truck": Vehicle,
            "equipment": Equipment,
            "trailer": Trailer,
        }
        model = model_map.get(item_type, Vehicle)
        return get_object_or_404(model, id=item_id)

    def get(self, request, item_id, *args, **kwargs):
        item_type = request.query_params.get("type", "truck")
        item = self.get_object(item_id, item_type)
        serializer_class = self.get_serializer_class(item_type)
        serializer = serializer_class(item)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, item_id, *args, **kwargs):
        item_type = request.query_params.get("type", "truck")
        item = self.get_object(item_id, item_type)
        serializer_class = self.get_serializer_class(item_type)
        serializer = serializer_class(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, item_id, *args, **kwargs):
        item_type = request.query_params.get("type", "truck")
        item = self.get_object(item_id, item_type)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UploadFileView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    parser_classes = [FileUploadParser]
    serializer_class = VehicleSerializer
    """
        Endpoint for parsing xlsx files and creating vehicles
        To use the endpoint, you must add the following to the header:
        "Content-Disposition" : "attachment; filename="your_file_name_here.xlsx"
        along with "file" as key
    """

    def post(self, request):
        try:
            file_obj = request.data["file"]
            file_content = file_obj.read()
            vehicle_data = parse_excel_to_vehicle(file_content)
            equipment_data = parse_excel_to_equipment(file_content)
            trailer_data = parse_excel_to_trailer(file_content)
            return Response(
                {
                    "status": "success",
                    "message": {
                        "vehicles": vehicle_data,
                        "equipments": equipment_data,
                        "trailers": trailer_data,
                    },
                }
            )
        except Exception as e:
            error_message = str(e)
            return Response({"status": "error", "message": error_message})


class BrandListApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        brands = Brand.objects.all()
        serialized_data = BrandSerializer(brands, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)


class TypeListApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        types = Type.objects.all()
        serialized_data = TypeSerializer(types, many=True).data
        return Response(serialized_data, status=status.HTTP_200_OK)

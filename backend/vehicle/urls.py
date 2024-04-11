from django.contrib import admin
from django.urls import include, path

from .views import DetailApiView, ItemListApiView, UploadFileView, BrandListApiView, TypeListApiView

urlpatterns = [
    path("", ItemListApiView.as_view(), name="vehicle"),
    path("/<uuid:item_id>", DetailApiView.as_view(), name="vehicle_detail"),
    path("/upload-file", UploadFileView.as_view(), name="upload_file"),
    path("/brands", BrandListApiView.as_view(), name="brands"),
    path("/types", TypeListApiView.as_view(), name="types"),
]

from django.urls import path

from . import consumer

websocket_urlpatterns = [
    path('ws/bid_updates/', consumer.BidConsumer.as_asgi()),
]
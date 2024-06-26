import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer


class BidConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "bid_updates"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get("message")
        if message:
            await self.send(text_data=json.dumps({"message": message}))

    async def bid_update(self, event):
        bid_data = event["bid_data"]

        bid_data["id"] = str(bid_data["id"])

        await self.send(
            text_data=json.dumps({"type": "bid.update", "bid_data": bid_data})
        )

    async def bid_delete(self, event):
        bid_id = event["bid_id"]
        await self.send(
            text_data=json.dumps({"type": "bid.delete", "bid_id": str(bid_id)})
        )

# Generated by Django 5.0.3 on 2024-03-30 06:23

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("auction", "0001_initial"),
        ("contenttypes", "0002_remove_content_type_name"),
    ]

    operations = [
        migrations.AddField(
            model_name="auction",
            name="end_time",
            field=models.TimeField(default="23:59"),
        ),
        migrations.AddField(
            model_name="auction",
            name="start_time",
            field=models.TimeField(default="00:00"),
        ),
        migrations.CreateModel(
            name="AuctionDay",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("date", models.DateField()),
                (
                    "auction",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="days",
                        to="auction.auction",
                    ),
                ),
            ],
            options={
                "unique_together": {("auction", "date")},
            },
        ),
        migrations.AlterUniqueTogether(
            name="auctionitem",
            unique_together=set(),
        ),
        migrations.AddField(
            model_name="auctionitem",
            name="auction_day",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.PROTECT,
                related_name="items",
                to="auction.auctionday",
            ),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name="auctionitem",
            unique_together={("auction_day", "content_type", "object_id")},
        ),
        migrations.RemoveField(
            model_name="auctionitem",
            name="auction_id",
        ),
        migrations.CreateModel(
            name="AuctionVerifiedUser",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4,
                        editable=False,
                        primary_key=True,
                        serialize=False,
                        unique=True,
                    ),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("cognito_user_id", models.CharField(max_length=255)),
                ("is_verified", models.BooleanField(default=False)),
                (
                    "auction",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="auction.auction",
                    ),
                ),
            ],
            options={
                "unique_together": {("cognito_user_id", "auction")},
            },
        ),
    ]

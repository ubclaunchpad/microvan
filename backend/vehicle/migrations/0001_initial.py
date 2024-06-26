# Generated by Django 5.0.4 on 2024-04-13 06:43

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("auction", "0004_alter_auction_end_time_alter_auction_start_time"),
        ("contenttypes", "0002_remove_content_type_name"),
    ]

    operations = [
        migrations.CreateModel(
            name="Brand",
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
                ("name", models.CharField(max_length=150)),
            ],
            options={
                "ordering": ["-created_at"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Supplier",
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
                ("name", models.CharField(max_length=150)),
            ],
            options={
                "ordering": ["-created_at"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Type",
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
                ("name", models.CharField(max_length=150)),
            ],
            options={
                "ordering": ["-created_at"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Trailer",
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
                ("unicode_id", models.IntegerField(unique=True)),
                (
                    "model_number",
                    models.CharField(blank=True, max_length=150, null=True),
                ),
                ("description", models.CharField(max_length=2000)),
                ("number_of_axles", models.IntegerField()),
                ("selling_price", models.IntegerField(default=0)),
                ("starting_price", models.IntegerField(default=0)),
                ("current_price", models.IntegerField(blank=True, null=True)),
                (
                    "supplier",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="vehicle.supplier",
                    ),
                ),
                (
                    "type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT, to="vehicle.type"
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Equipment",
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
                ("unicode_id", models.IntegerField(unique=True)),
                (
                    "model_number",
                    models.CharField(blank=True, max_length=150, null=True),
                ),
                (
                    "chassis_number",
                    models.CharField(blank=True, max_length=150, null=True),
                ),
                (
                    "engine_number",
                    models.CharField(blank=True, max_length=150, null=True),
                ),
                ("description", models.CharField(max_length=2000)),
                ("selling_price", models.IntegerField(default=0)),
                ("starting_price", models.IntegerField(default=0)),
                ("current_price", models.IntegerField(blank=True, null=True)),
                ("location", models.CharField(blank=True, max_length=50, null=True)),
                (
                    "classification_type",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                (
                    "engine_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "transmission_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "differentials_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "brake_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "electrical_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "hydraulic_cylinder_condition",
                    models.CharField(blank=True, max_length=500, null=True),
                ),
                (
                    "hydraulic_hoses_and_chrome_condition",
                    models.CharField(blank=True, max_length=500, null=True),
                ),
                (
                    "chassis_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "body_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "brand",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT, to="vehicle.brand"
                    ),
                ),
                (
                    "type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT, to="vehicle.type"
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="UnitImage",
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
                ("image_url", models.CharField(max_length=500)),
                ("object_id", models.UUIDField()),
                (
                    "content_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="contenttypes.contenttype",
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="Vehicle",
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
                ("unicode_id", models.IntegerField(unique=True)),
                (
                    "model_number",
                    models.CharField(blank=True, max_length=150, null=True),
                ),
                (
                    "engine_number",
                    models.CharField(blank=True, max_length=150, null=True),
                ),
                ("selling_price", models.IntegerField(default=0)),
                ("starting_price", models.IntegerField(default=0)),
                ("current_price", models.IntegerField(blank=True, null=True)),
                (
                    "chassis_number",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                ("description", models.CharField(max_length=2000)),
                ("is_sold", models.BooleanField(default=False)),
                ("remarks", models.CharField(blank=True, max_length=2000, null=True)),
                (
                    "classification_type",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                (
                    "engine_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "transmission_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "differentials_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "brake_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "electrical_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "operating_system_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "chassis_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "body_condition",
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "brand",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT, to="vehicle.brand"
                    ),
                ),
                (
                    "type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT, to="vehicle.type"
                    ),
                ),
            ],
            options={
                "ordering": ["-created_at"],
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="SavedUnits",
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
                ("bidder_id", models.CharField(max_length=255)),
                ("object_id", models.UUIDField()),
                (
                    "auction_day",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="auction.auctionday",
                    ),
                ),
                (
                    "content_type",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="contenttypes.contenttype",
                    ),
                ),
            ],
            options={
                "unique_together": {("auction_day", "object_id")},
            },
        ),
    ]

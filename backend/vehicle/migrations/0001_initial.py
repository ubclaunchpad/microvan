# Generated by Django 5.0.2 on 2024-02-15 01:41

import django.db.models.deletion
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("auction", "0001_initial"),
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
                    "chassis_number",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                ("description", models.CharField(max_length=2000)),
                ("number_of_axles", models.IntegerField()),
                (
                    "supplier",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="vehicle.supplier",
                    ),
                ),
                (
                    "trailer_type",
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
                ("prefix_id", models.CharField(max_length=10)),
                (
                    "chassis_number",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                (
                    "engine_number",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                ("description", models.CharField(max_length=2000)),
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
                    models.CharField(blank=True, max_length=100, null=True),
                ),
                (
                    "hydraulic_hoses_and_chrome_condition",
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
                    "equipment_type",
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
                    models.CharField(blank=True, max_length=10, null=True),
                ),
                (
                    "chassis_number",
                    models.CharField(blank=True, max_length=50, null=True),
                ),
                ("description", models.CharField(max_length=2000)),
                ("minimum_price", models.IntegerField(blank=True, null=True)),
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
                    "vehicle_type",
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
                ("object_id", models.UUIDField()),
                (
                    "auction_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="auction.auction",
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
                "unique_together": {("auction_id", "object_id")},
            },
        ),
    ]

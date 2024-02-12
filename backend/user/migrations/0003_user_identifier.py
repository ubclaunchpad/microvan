# Generated by Django 4.2.7 on 2024-02-12 01:34

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):
    dependencies = [
        ("user", "0002_user_company_address_user_phone_number"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="identifier",
            field=models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
        ),
    ]

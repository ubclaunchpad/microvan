import uuid

from django.db import models
from django.utils import timezone


class MainModel(models.Model):
    """
    The skeleton for all models, will provide three unique fields
    that every model should have. All models should extend this.
    """

    id = models.UUIDField(
        unique=True, default=uuid.uuid4, editable=False, primary_key=True
    )
    created_at = models.DateTimeField(editable=False, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        date = timezone.now()
        if not self.id and self.created_at is None:
            self.created_at = date
        self.updated_at = date

        if "created_at" in kwargs:
            self.created_at = kwargs.pop("created_at")
            self.updated_at = self.created_at
        return super().save(*args, **kwargs)

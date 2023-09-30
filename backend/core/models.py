import uuid

from django.db import models
from django.utils import timezone


class AuditModel(models.Model):
    """
        The skeleton for all models, will provide three unique fields
        that every model should have. All models should extend this. 
    """
    identifier = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(editable=False)
    updated_at = models.DateTimeField()

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

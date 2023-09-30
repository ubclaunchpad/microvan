from django.db import models
from core.models import AuditModel

class Auction(AuditModel):
    date = models.DateTimeField(editable=False)

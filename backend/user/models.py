from django.db import models
from core.models import AuditModel
# Create your models here.
class User(AuditModel):
    name = models.CharField(max_length=150, null=False)
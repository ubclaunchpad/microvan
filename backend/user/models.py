from django.db import models, IntegrityError
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        """
        Create and return a regular user with an email and password.
        """
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        """
        Create and return a superuser with an email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

    def get_or_create_for_cognito(self, payload):
        cognito_id = payload['sub']

        try:
            return self.get(cognito_id=cognito_id)
        except self.model.DoesNotExist:
            pass

        try:
            user = self.create_user(
                cognito_id=cognito_id,
                email=payload['email'],
                is_active=True,
                phone_number=payload.get('phone_number', ''),
                company_name=payload.get('custom:company_name', ''),
                company_address=payload.get('custom:company_address', ''),
                is_blacklisted=payload.get('custom:is_blacklisted', False),
                bidder_number=payload.get('custom:bidder_number', ''),
                family_name=payload.get('family_name', ''),
                given_name=payload.get('given_name', ''),
                password=None)
            return user
        except IntegrityError:
            user = self.get(cognito_id=cognito_id)
            return user

class User(AbstractBaseUser, PermissionsMixin):
    cognito_id = models.CharField(max_length=128, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Custom fields
    phone_number = models.CharField(max_length=32, blank=True, null=True)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    company_address = models.TextField(blank=True, null=True)
    is_blacklisted = models.BooleanField(default=False)
    bidder_number = models.CharField(max_length=128, blank=True, null=True)
    family_name = models.CharField(max_length=255, blank=True, null=True)
    given_name = models.CharField(max_length=255, blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
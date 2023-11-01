from django.urls import path
from .views import set_user_role, update_user_profile

urlpatterns = [
    path('user/updateUser/', update_user_profile, name='update_user_profile'),
    path('user/setRole/', set_user_role, name='set_user_role'),
]

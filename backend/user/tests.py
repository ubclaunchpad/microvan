from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from .models import Bidder
from rest_framework_simplejwt.tokens import RefreshToken

class BidderDetailApiViewTests(TestCase):
    def setUp(self):
        self.admin_user = User.objects.create_user(username='admin', password='adminpassword', is_staff=True)

        self.bidder = Bidder.objects.create(name='Test Bidder')

        self.client = APIClient()

    def test_delete_bidder_as_admin(self):
        token = RefreshToken.for_user(self.admin_user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        response = self.client.delete(f'/bidders/{self.bidder.id}/')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

        self.assertFalse(Bidder.objects.filter(id=self.bidder.id).exists())

    def test_delete_bidder_as_non_admin(self):
        non_admin_user = User.objects.create_user(username='user', password='password', is_staff=False)

        token = RefreshToken.for_user(non_admin_user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        response = self.client.delete(f'/bidders/{self.bidder.id}/')

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

        self.assertTrue(Bidder.objects.filter(id=self.bidder.id).exists())

    def test_delete_bidder_without_authentication(self):
        response = self.client.delete(f'/bidders/{self.bidder.id}/')

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        self.assertTrue(Bidder.objects.filter(id=self.bidder.id).exists())
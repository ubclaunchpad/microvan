from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Admin, Bidder


@api_view(['POST'])
def set_user_role(request):
    email = request.data.get("email")
    role = request.data.get("role")

    # Check if the role is valid
    if role not in ["admin", "bidder"]:
        return Response({"error": "Invalid role"}, status=400)

    # Input user fields
    if role == "admin":
        admin, newAdmin = Admin.objects.get_or_create(email=email)
        if newAdmin:
            admin.password = request.data.get("password")
            admin.first_name = request.data.get("first_name")
            admin.last_name = request.data.get("last_name")
            admin.permission_level = request.data.get("permission_level")
            admin.save()

    elif role == "bidder":
        bidder, newBidder = Bidder.objects.get_or_create(email=email)
        if newBidder:
            bidder.password = request.data.get("password")
            bidder.first_name = request.data.get("first_name")
            bidder.last_name = request.data.get("last_name")
            bidder.company_name = request.data.get("company_name")
            bidder.bidder_number = request.data.get("bidder_number")
            bidder.is_verified = request.data.get("is_verified")
            bidder.is_blacklisted = request.data.get("is_blacklisted")
            bidder.save()

    return Response({"message": f"User converted to {role}, fields populated"})


@api_view(['PUT'])
def update_user_profile(request, email, role):
    if role == "admin":
        try:
            admin = Admin.objects.get(email=email)
            admin.password = request.data.get("password")
            admin.first_name = request.data.get("first_name")
            admin.last_name = request.data.get("last_name")
            admin.permission_level = request.data.get("permission_level")
            admin.save()
            return Response({"message": "Admin has been updated"})
        except Admin.DoesNotExist:
            return Response({"error": "Admin not found"}, status=400)
    elif role == "bidder":
        try:
            bidder = Bidder.objects.get(email=email)
            bidder.first_name = request.data.get("first_name")
            bidder.last_name = request.data.get("last_name")
            bidder.company_name = request.data.get("company_name")
            bidder.bidder_number = request.data.get("bidder_number")
            bidder.is_verified = request.data.get("is_verified")
            bidder.is_blacklisted = request.data.get("is_blacklisted")
            bidder.save()
            return Response({"message": "Bidder has been updated"})
        except Bidder.DoesNotExist:
            return Response({"error": "Bidder not found"}, status=400)
    else:
        return Response({"error": "Invalid role"}, status=400)
    
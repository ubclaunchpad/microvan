from .models import Brand, Equipment, Supplier, Trailer, Type, UnitImage, Vehicle


def infinite_filter(request):
    url_parameter = request.GET.get("search")
    if url_parameter:
        limit = request.GET.get("l")
        offset = request.GET.get("o")
        if limit and offset:
            return Vehicle.objects.filter(unicode_id__icontains=url_parameter)[
                : int(offset) + int(limit)
            ]
        elif limit:
            return Vehicle.objects.filter(unicode_id__icontains=url_parameter)[
                : int(limit)
            ]
        else:
            return Vehicle.objects.filter(unicode_id__icontains=url_parameter)[:15]
    return Vehicle.objects.all()[:40]


def has_more_data(request):
    offset = request.GET.get("o")
    limit = request.GET.get("l")
    if offset:
        return Vehicle.objects.all().count() > (int(offset) + int(limit))

    elif limit:
        return Vehicle.objects.all().count() > int(limit)
    else:
        return False

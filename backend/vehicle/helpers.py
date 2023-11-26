from .models import (
    Brand, Equipment, Supplier, Trailer, Type, UnitImage, Vehicle)

def infinite_filter(request):
    url_parameter = request.GET.get('p')
    if url_parameter:
        limit = request.GET.get('l') 
        offset = request.GET.get('o') 
        if limit and offset:
            return Vehicle.objects.filter(unicode_id__icontains=url_parameter)[:int(offset) + int(limit)] 
        elif limit:
             return Vehicle.objects.filter(unicode_id__icontains=url_parameter)[:int(limit)]
        else:
            return Vehicle.objects.filter(unicode_id__icontains=url_parameter)[:15]
    return Vehicle.objects.all()[:40]

def has_more_data(request):
    o = request.GET.get('o')
    l = request.GET.get('l')
    if o:
        return Vehicle.objects.all().count() > int(o)

    elif l:
        return Vehicle.objects.all().count() > int(l)
    else: 
        return False
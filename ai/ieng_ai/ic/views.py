from email.policy import default
from django.shortcuts import render
from django.shortcuts import get_list_or_404, get_object_or_404, render, redirect
from django.views.decorators.http import require_http_methods,require_POST,require_safe
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.files.storage import default_storage
import io
from .models import Image
from .clarifai.test import test

@api_view(['POST'])
def imagecaption(request):
    
    # path = json.loads(request.body)['picture_path']
    
    # img = Image()
    # img.image=request.FILES['image']
    # img.save()
    img = request.FILES['image']
    img.name = 'original.jpg'
    path = "images/original.jpg"
    if(default_storage.exists(path)):
        default_storage.delete(path)
        default_storage.save("images"+'/'+img.name,img)
    else:
        default_storage.save("images"+'/'+img.name,img)
    

    ans = test(path)
    
    if ans:
        msg = "SUCCESS"
    else:
        msg = "FAIL"
    res = {
        "message" : msg,
        "data" : ans        
    }
    return Response(res,status=status.HTTP_200_OK)


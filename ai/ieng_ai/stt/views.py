from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.core.files.storage import default_storage
from . import tests



@api_view(['POST'])
def stt(request):
    voice = request.FILES['voice']
    voice.name = 'original.wav'
    path = "voices/original.wav"
    if(default_storage.exists(path)):
        default_storage.delete(path)
        default_storage.save("voices"+'/'+voice.name,voice)
    else:
        default_storage.save("voices"+'/'+voice.name,voice)
    print("!!!!!!!!!!")
    ans = tests.ai(path)
    # ans = test(path)
    print("???????????????")
    if ans:
        msg = "SUCCESS"
    else:
        msg = "FAIL"
    res = {
        "message" : msg,
        "data" : ans        
    }
    return Response(res,status=status.HTTP_200_OK)

@api_view(['GET'])
def test(self):
    msg = "test OK"
    return Response(msg)
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ai-api/diaries/', include('ic.urls')),
    path('ai-api/studies/', include('stt.urls'))
]

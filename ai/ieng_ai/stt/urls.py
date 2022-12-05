from django.urls import path
from . import views

app_name = 'stt'

urlpatterns = [
    path('stt/', views.stt),
    path('test', views.test),
]
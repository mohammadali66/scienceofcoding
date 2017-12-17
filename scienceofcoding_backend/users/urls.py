from django.conf.urls import url
#from django.urls import path, include

from . import views

app_name='users'

# urlpatterns = [
#     
#     path('', views.UserListAPIView.as_view(), name='userslist'),
# ]

urlpatterns = [
    
    url(r'^', views.UserListAPIView.as_view(), name='userslist'),
]

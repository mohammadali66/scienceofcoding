from django.conf.urls import url
# from django.urls import path, include

from . import views

app_name = 'users'

# urlpatterns = [
#     
#     path('', views.UserListAPIView.as_view(), name='userslist'),
# ]

urlpatterns = [
    url(r'^detail/(?P<slug>[\w-]+)/$', views.UserProfileAPIView.as_view(), name='detail'),
    url(r'^login/$', views.UserLoginAPIView.as_view(), name='login'),
    url(r'^register/$', views.UserRegisterAPIView.as_view(), name='register'),
    url(r'^simple/$', views.SimpleView.as_view(), name='simple'),
    url(r'^$', views.UserListAPIView.as_view(), name='userslist'),
    
    
]

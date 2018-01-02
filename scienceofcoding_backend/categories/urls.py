from django.conf.urls import url, include
#from django.urls import path, include

from . import views

urlpatterns = [    
    url(r'^categorylist/', views.CategoryListMenuAPIView.as_view(), name='categorylist'),    
    url(r'^detail/(?P<slug>[\w-]+)/$', views.CategoryDetailAPIView.as_view(), name='detail'),
]

from django.conf.urls import url, include
#from django.urls import path, include

from . import views

urlpatterns = [        
    url(r'^detail/(?P<slug>[\w-]+)/$', views.TagAPIView.as_view(), name='detail'),
]

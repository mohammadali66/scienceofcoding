from django.conf.urls import url, include
# from django.urls import path, include

from . import views

app_name = 'tag-api'

urlpatterns = [        
    url(r'^detail/(?P<slug>[\w-]+)/$', views.TagAPIView.as_view(), name='detail'),
    url(r'^all/$', views.AllTagAPIView.as_view(), name='all'),
]

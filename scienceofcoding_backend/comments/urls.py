from django.conf.urls import url, include
# from django.urls import path, include

from . import views

app_name = 'comment-api' 

urlpatterns = [        
               
    url(r'^create/$', views.CommentCreateAPIView.as_view(), name='create'),
    
]




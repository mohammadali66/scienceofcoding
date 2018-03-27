from django.conf.urls import url, include
# from django.urls import path, include

from . import views

app_name = 'category-api'

urlpatterns = [    
    url(r'^categorylist/', views.CategoryListMenuAPIView.as_view(), name='categorylist'),
    url(r'^detail/(?P<slug>[\w-]+)/$', views.CategoryDetailAPIView.as_view(), name='detail'),
    url(r'^categorylastarticle/', views.CategoryLastArticleAPIView.as_view(), name='categorylastarticle'),
]

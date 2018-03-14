from django.conf.urls import url, include
# from django.urls import path, include

from . import views

app_name = 'article-api' 

urlpatterns = [    
    url(r'^articlescategory/(?P<categoryslug>[\w-]+)/$',
                views.ArticleListOfOneCategoryAPIView.as_view(), name='articlescategory'),
               
    url(r'^articlestag/(?P<tagslug>[\w-]+)/$',
                views.ArticleListOfOneTagAPIView.as_view(), name='articlestag'),
               
    url(r'^detail/(?P<slug>[\w-]+)/$', views.ArticleAPIView.as_view(), name='detail'),
    url(r'^lastarticle/(?P<count>[\d]+)/$', views.LastArticleAPIView.as_view(), name='lastarticle'),
    
]




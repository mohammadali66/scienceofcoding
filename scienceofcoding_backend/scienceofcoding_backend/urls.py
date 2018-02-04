"""scienceofcoding_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
# from django.urls import path, include

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/user/', include('users.urls', namespace='users')),
    url(r'^api/category/', include('categories.urls', namespace='category-api')),
    url(r'^api/article/', include('articles.urls', namespace='article-api')),
    url(r'^api/tag/', include('tags.urls', namespace='tag-api')),
    url(r'^api/analytics/', include('clientUsers.urls', namespace='clientUsers-api')),
    url(r'^api/comment/', include('comments.urls', namespace='comment-api')),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


# urlpatterns = [
#     path('admin/', admin.site.urls),
#     #path('users/', include('users.urls', namespace='publisher-polls')),
#     path('users/', include('users.urls', namespace='users')),
# ]


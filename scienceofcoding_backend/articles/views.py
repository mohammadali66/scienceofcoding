# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions

from . import serializers
from .models import Article
from .paginations import StandardResultsSetPagination


class ArticleListOfOneCategoryAPIView(ListAPIView):
    serializer_class = serializers.ArticleBriefSerializer
    pagination_class = StandardResultsSetPagination
    
    def get_queryset(self):
        articleList = Article.objects.filter(
                                                category__slug=self.kwargs.get('categoryslug'),
                                                is_active=True
                                            )
        return articleList 

# ...............................................................................................................
class ArticleListOfOneTagAPIView(ListAPIView):
    serializer_class = serializers.ArticleBriefSerializer
    pagination_class = StandardResultsSetPagination
    
    def get_queryset(self):
        articleList = Article.objects.filter(
                                                tags__slug=self.kwargs.get('tagslug'),
                                                is_active=True
                                            )
        return articleList 


# ...............................................................................................................
class ArticleAPIView(RetrieveAPIView):
    serializer_class = serializers.ArticleSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Article.objects.all()
    lookup_field = 'slug'
    
    
    
    

# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

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
    
# ...............................................................................................................
class LastArticleAPIView(APIView):

    serializer_class = serializers.ArticleBriefSerializer
    permission_classes = (permissions.AllowAny, )

    def get(self, request, count, *args, **kwargs):
        try:
            articleList = Article.objects.filter(is_active=True).order_by('-updated_datetime') [:int(count)]
            return Response(self.serializer_class(articleList, many=True).data, status=status.HTTP_200_OK)

        except:
            articleList = None
            return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)


    
    

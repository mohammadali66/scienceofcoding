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
class ArticleAPIView(APIView):
    serializer_class = serializers.ArticleSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, slug):
        try:
            article = Article.objects.get(slug=slug)
            article.view_count += 1
            article.save()
            return Response(self.serializer_class(article).data, status=status.HTTP_200_OK)
        except:
            article = None
            return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)

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

# ...............................................................................................................
#most view article
class MostViewArticleAPIView(APIView):
    serializer_class = serializers.ArticleBriefSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, count, *args, **kwargs):
        try:
            articleList = Article.objects.filter(is_active=True).order_by('-view_count')[:int(count)]
            return Response(self.serializer_class(articleList, many=True).data, status=status.HTTP_200_OK)

        except:
            articleList = None
            return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)

    
    

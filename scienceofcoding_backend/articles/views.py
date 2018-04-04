# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.db.models import Q
from django.contrib.sitemaps import Sitemap

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
#15th farvardin 97: this view changed to articles that featured == True
class MostViewArticleAPIView(APIView):
    serializer_class = serializers.ArticleBriefSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, count, *args, **kwargs):
        try:
            articleList = Article.objects.filter(is_active=True, featured=True)[:int(count)]
            return Response(self.serializer_class(articleList, many=True).data, status=status.HTTP_200_OK)

        except:
            articleList = None
            return Response({'message': 'not found'}, status=status.HTTP_404_NOT_FOUND)

# ...............................................................................................................
# Search Article
class SearchArticleAPIView(APIView):
    serializer_class = serializers.ArticleBriefSerializer
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        try:
            search_string = request.query_params['q']
            # search_list = search_string.split()
            # search_list.append(search_string)

            article_list = Article.objects.filter(
                                        Q(title_english__icontains=search_string) |
                                        Q(title_farsi__icontains=search_string) |
                                        Q(abstract_english__icontains=search_string) |
                                        Q(abstract_farsi__icontains=search_string) |
                                        Q(content_english__icontains=search_string) |
                                        Q(content_farsi__icontains=search_string)
                        ).distinct()

            return Response(self.serializer_class(article_list, many=True).data, status=status.HTTP_200_OK)

        except:
            return Response({'message': 'not found'}, status=status.HTTP_400_BAD_REQUEST)

    
# ...............................................................................................................
# ...............................................................................................................
# ...............................................................................................................
#sitemap for article model ......................................................................................
class ArticleSitemap(Sitemap):
    changefreq = "daily"
    priority = 0.5

    def items(self):
        return Article.objects.filter(is_active=True)

    def lastmod(self, obj):
        return obj.updated_datetime

    def location(self, obj):
        return obj.get_frontend_url()






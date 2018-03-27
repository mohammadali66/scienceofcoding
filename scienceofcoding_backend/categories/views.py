# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions

from . import serializers
from .models import Category


class CategoryListMenuAPIView(ListAPIView):
    
    serializer_class = serializers.CategoryListMenuSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Category.objects.all()

# ...............................................................................................................
class CategoryDetailAPIView(RetrieveAPIView):
    
    serializer_class = serializers.CategoryDetailSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Category.objects.all()
    lookup_field = 'slug'
    
# ...............................................................................................................
class CategoryLastArticleAPIView(ListAPIView):

    serializer_class = serializers.CategoryLastArticleSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Category.objects.all()


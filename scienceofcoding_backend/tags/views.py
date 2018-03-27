# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework import permissions

from .models import Tag
from . import serializers

class TagAPIView(RetrieveAPIView):
    
    serializer_class = serializers.TagSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Tag.objects.all()
    lookup_field = 'slug'
    
#..........................................................................................................
class AllTagAPIView(ListAPIView):
    serializer_class = serializers.TagSerializer
    permission_classes = (permissions.AllowAny,)
    queryset = Tag.objects.all()





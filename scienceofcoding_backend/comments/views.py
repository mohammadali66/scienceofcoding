# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.generics import CreateAPIView
from rest_framework import permissions

from . import serializers
from .models import Comment

class CommentCreateAPIView(CreateAPIView):
    
    serializer_class = serializers.CommentCreateSerializer
    permission_classes = (permissions.IsAuthenticated, )
    
    queryset = Comment.objects.all()
     










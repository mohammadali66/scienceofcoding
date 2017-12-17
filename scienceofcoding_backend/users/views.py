from rest_framework.generics import ListAPIView
from rest_framework import permissions

from django.contrib.auth import get_user_model
from django.contrib.sessions.backends.db import SessionStore

from . import serializers

User = get_user_model()


class UserListAPIView(ListAPIView):
    serializer_class = serializers.UserListSerializer
    #permission_classes = (permissions.IsAuthenticated, )
    #queryset = User.objects.all() 

    def get_queryset(self):
        queryset = User.objects.all()
        
        s = SessionStore()
        s.create()
        print('session key: %s' % s.session_key)
        return queryset


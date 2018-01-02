from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions

from django.contrib.auth import get_user_model
from django.contrib.sessions.backends.db import SessionStore

from . import serializers
from .models import UserProfile

User = get_user_model()


class UserListAPIView(ListAPIView):
    serializer_class = serializers.UserListSerializer
    #permission_classes = (permissions.IsAuthenticated, )
    queryset = User.objects.all() 

#...............................................................................................................
class UserProfileAPIView(RetrieveAPIView):
    serializer_class = serializers.UserProfileSerializer
    permission_classes = (permissions.AllowAny, )
    queryset = UserProfile.objects.all()
    lookup_field = 'slug'
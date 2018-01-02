# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.generics import ListAPIView
from rest_framework import permissions, status
from rest_framework.views import APIView, Response

from .models import Page
from . import serializers


class PageAPIView(APIView):
    
    def get(self, request, date, *args, **kwargs):
        try:
            pageList = Page.objects.filter(clientuseropenedpage__open_datetime__date=date).distinct()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.PageSerializer(pageList, context={'date': date, }, many=True)
        
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.error_messages, status=status.HTTP_404_NOT_FOUND)
        
        
#..............................................................................................................
class PageTwoDateAPIView(APIView):
    
    def get(self, request, fromdate, todate, *args, **kwargs):
        try:
            pageList = Page.objects.filter(clientuseropenedpage__open_datetime__date__range=(fromdate, todate)).distinct()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.PageTwoDateSerializer(pageList, context={'fromdate': fromdate, 'todate': todate }, many=True)
        
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.error_messages, status=status.HTTP_404_NOT_FOUND)

            
        





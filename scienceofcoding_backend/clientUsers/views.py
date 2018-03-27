# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import datetime
from django.utils import timezone

from rest_framework.generics import ListAPIView
from rest_framework import permissions, status
from rest_framework.views import APIView, Response

from .models import Page, ClientUserOpenedPage
from . import serializers


class PageAPIView(APIView):

    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    #if instead of real date, use notation '1000-01-01', it set today date.
    def get(self, request, date, *args, **kwargs):
        if date == '1000-01-01':     #a notation for today
            date = '%s' % timezone.now().date()

        try:
            #page list that opened in this datetime:
            pageList = Page.objects.filter(clientuseropenedpage__open_datetime__date=date).distinct()
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.PageSerializer(pageList, context={'date': date, }, many=True)
        
        if serializer.is_valid:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.error_messages, status=status.HTTP_404_NOT_FOUND)
        
        
# ..............................................................................................................
class PageTwoDateAPIView(APIView):

    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

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

# ..............................................................................................................
class CountViewFromDayUntilNowAPIView(APIView):

    permission_classes = (permissions.IsAuthenticated, permissions.IsAdminUser,)

    def get(selfself, request, day, *args, **kwargs):

        #this function receive day, and compute view count from today until previous day.
        #return 2 list, one for title of chart and another for data of chart.
        today_date = datetime.datetime.now().date()
        chart_title = []
        chart_data = []
        try:
            for i in range(0, int(day)):
                myDate = today_date - datetime.timedelta(days=i)

                #set date like 5 Mar :
                chart_title.append('%s %s' % (myDate.day, myDate.strftime('%b')))

                #get view count for each day :
                clientUserOpenedPage_count = ClientUserOpenedPage.objects.filter(open_datetime__date=myDate).count()
                chart_data.append(clientUserOpenedPage_count)

            context = {
                'chart_title': chart_title,
                'chart_data' : chart_data,
            }
            return Response(context, status=status.HTTP_200_OK)
        except:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
            
        





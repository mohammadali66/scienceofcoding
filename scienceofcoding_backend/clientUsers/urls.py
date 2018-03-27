from django.conf.urls import url
# from django.urls import path, include

from . import views

app_name = 'clientUsers-api'

urlpatterns = [    
    url(r'^pagelist/(?P<date>[0-9]{4}-?[0-9]{2}-?[0-9]{2})/$',
                            views.PageAPIView.as_view(), name='pagelist'),
    
    url(r'^pagelist2/(?P<fromdate>[0-9]{4}-?[0-9]{2}-?[0-9]{2})/(?P<todate>[0-9]{4}-?[0-9]{2}-?[0-9]{2})/$',
                            views.PageTwoDateAPIView.as_view(), name='pagelist2'),

    url(r'^viewcount/(?P<day>\d+)/$', views.CountViewFromDayUntilNowAPIView.as_view(), name='viewcountweek'),
]

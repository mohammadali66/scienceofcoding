from .models import Page, ClientUser, ClientUserOpenedPage
from rest_framework.serializers import ModelSerializer, SerializerMethodField


class ClientUserOpenedPageSerializer(ModelSerializer):
    
    clientUser = SerializerMethodField()
    country    = SerializerMethodField()
    city       = SerializerMethodField()
    open_date  = SerializerMethodField()
    open_time  = SerializerMethodField()
    end_date   = SerializerMethodField()
    end_time   = SerializerMethodField()

    class Meta:
        model = ClientUserOpenedPage
        fields = (
                    'clientUser',
                    'page',
                    'country',
                    'city',
                    'open_date',
                    'open_time',
                    'end_date',
                    'end_time',
                    'duration',
                )
    
    def get_clientUser(self, obj):
        return obj.clientUser.ip_address
    

    def get_country(self, obj):
        return obj.clientUser.country


    def get_city(self, obj):
        return obj.clientUser.city


    def get_open_date(self, obj):
        if obj.open_datetime:
            date_str = '%s/%s/%s' % (obj.open_datetime.year, obj.open_datetime.month, obj.open_datetime.day)
            return date_str
        return ''
    
    
    def get_open_time(self, obj):
        if obj.open_datetime:
            time_str = '%s:%s' % (obj.open_datetime.hour, obj.open_datetime.minute)
            return time_str
        return ''
        
    
    def get_end_date(self, obj):
        if obj.end_datetime:
            date_str = '%s/%s/%s' % (obj.end_datetime.year, obj.end_datetime.month, obj.end_datetime.day)
            return date_str
        return ''
    
    
    def get_end_time(self, obj):
        if obj.end_datetime:
            time_str = '%s:%s' % (obj.end_datetime.hour, obj.end_datetime.minute)
            return time_str
        return ''
    
# ...............................................................................................................
class PageSerializer(ModelSerializer):
    
    clientUserOpenedPage_list = SerializerMethodField()
    
    class Meta:
        model = Page
        fields = (
                    'name',
                    'clientUserOpenedPage_list',
                )

    def get_clientUserOpenedPage_list(self, obj):
        
        date = self.context['date']  # from context        
        try:
            query_list = ClientUserOpenedPage.objects.filter(page=obj, open_datetime__date=date).order_by('open_datetime')
        except:
            query_list = None
            
        return ClientUserOpenedPageSerializer(query_list, many=True).data

# ...............................................................................................................
class PageTwoDateSerializer(ModelSerializer):
    
    clientUserOpenedPage_list = SerializerMethodField()
    
    class Meta:
        model = Page
        fields = (
                    'name',
                    'clientUserOpenedPage_list',
                )

    def get_clientUserOpenedPage_list(self, obj):
        
        fromdate = self.context['fromdate']  # from context        
        todate = self.context['todate']  # from context
        try:
            query_list = ClientUserOpenedPage.objects.filter(
                        page=obj, open_datetime__date__range=(fromdate, todate)).order_by('open_datetime')
        except:
            query_list = None
            
        return ClientUserOpenedPageSerializer(query_list, many=True).data






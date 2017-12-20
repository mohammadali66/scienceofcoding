# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import *

class ClientUserAdmin(admin.ModelAdmin):
    
    list_display = ['id', 'ip_address', 'country', 'city', 'created_datetime', 'updated_datetime',]

    fields = [('ip_address', 'isp'), ('country', 'city'), ('altitude', 'longitude'),
               ('created_datetime', 'updated_datetime'), ]
    
    readonly_fields = ['ip_address', 'isp', 'country', 'city', 'altitude', 'longitude',
               'created_datetime', 'updated_datetime']
    
    list_filter = ['country', 'city', 'created_datetime', ]
    search_fields = ['id', 'ip_address', 'country', 'city', ]

admin.site.register(ClientUser, ClientUserAdmin)

#.............................................................................................................
class PageAdmin(admin.ModelAdmin):
    list_display = ['name']
    
admin.site.register(Page, PageAdmin)

#.............................................................................................................
class ClientUserOpenedPageAdmin(admin.ModelAdmin):
    list_display = ['clientUser', 'page', 'id', 'open_datetime', 'end_datetime', 'duration', ]

admin.site.register(ClientUserOpenedPage, ClientUserOpenedPageAdmin)








# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone



class ClientUser(models.Model):
    
    ip_address          = models.CharField(max_length=20, blank=True, null=True)
    isp                 = models.CharField(max_length=30, blank=True, null=True)
    
    country             = models.CharField(max_length=20, blank=True, null=True)
    city                = models.CharField(max_length=20, blank=True, null=True)
    
    altitude            = models.CharField(max_length=20, blank=True, null=True)
    longitude           = models.CharField(max_length=20, blank=True, null=True)
    
    created_datetime    = models.DateTimeField(auto_now_add = True, auto_now = False)
    updated_datetime    = models.DateTimeField(default = timezone.now)
    
     
    def __unicode__(self):
        return str(self.ip_address)
    
    def __str__(self):
        return str(self.ip_address)
    
    @property
    def opened_pages(self):
        instance = self
        page_list = ClientUserOpenedPage.objects.filter(
                                                        clientUser=instance,
                                                        end_datetime=None
                                                    )
        return page_list
    
    
    @property
    def all_pages(self):
        instance = self
        page_list = ClientUserOpenedPage.objects.filter(
                                                        clientUser=instance                                                    
                                                    )
        return page_list 
    
#..............................................................................................................
class Page(models.Model):
    name = models.CharField(max_length=150)
    #article = models.OneToOneField(Article, null=True, blank=True)
    
    
    def __unicode__(self):
        return str(self.name)

    def __str__(self):
        return str(self.name)

#..............................................................................................................
class ClientUserOpenedPage(models.Model):
    clientUser     = models.ForeignKey(ClientUser, on_delete=models.CASCADE)
    page           = models.ForeignKey(Page, on_delete=models.CASCADE)
    open_datetime  = models.DateTimeField(auto_now_add = True, auto_now = False)
    end_datetime   = models.DateTimeField(default=None, null=True, blank=True)
    

    @property
    def duration(self):
        if self.end_datetime:
            seconds = (self.end_datetime - self.open_datetime).seconds
            minutues = seconds // 60 % 60
            if minutues > 0:
                return '%s min' % str(minutues)
            else:
                return '%s sec' % str(seconds)
                
        else:
            return '0 min'

    def __unicode__(self):
        return '{0} in page: {1}'.format(self.clientUser, self.page)
    
    def __str__(self):
        return '{0} in page: {1}'.format(self.clientUser, self.page)






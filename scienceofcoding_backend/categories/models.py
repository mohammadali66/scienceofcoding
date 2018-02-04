# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
# from django.core.urlresolvers import reverse
from django.urls import reverse

# ...............................................................................................................
def upload_location(instance, filename):
    filebase, extension = filename.split('.')
    return 'categoryImage/%s.%s' % (instance.name, extension)
    
# ...............................................................................................................
class Category(models.Model):
    name         = models.CharField(max_length=50)
    slug         = models.SlugField(unique=True, allow_unicode=True)    
    description  = models.TextField(null=True, blank=True)
    image        = models.ImageField(upload_to=upload_location, null=True, blank=True,
                                                    width_field='width_field', height_field='height_field')
    width_field  = models.IntegerField(default=0)
    height_field = models.IntegerField(default=0)
    
    
    def __unicode__(self):
        return self.name
    
    
    def __str__(self):
        return self.name
    
    
    def get_api_url(self):
        return reverse('category-api:detail', kwargs={'slug': self.slug})
    
        
    class Meta:
        unique_together = ('name', 'slug')






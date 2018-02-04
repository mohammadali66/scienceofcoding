# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(unique=True, allow_unicode=True)
    
    
    def __unicode__(self):
        return self.name
    
    
    def __str__(self):
        return self.name
    
    
    def get_api_url(self):
        return 'aaaa';
    
    class Meta:
        unique_together = ('name', 'slug')








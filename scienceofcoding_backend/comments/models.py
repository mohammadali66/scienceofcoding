# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

from articles.models import Article


class Comment(models.Model):
    user             = models.ForeignKey(User, on_delete=models.CASCADE)
    article          = models.ForeignKey(Article, on_delete=models.CASCADE)
    parent           = models.ForeignKey('Comment', on_delete=models.CASCADE, null=True, blank=True)
    content          = models.TextField()
    created_datetime = models.DateTimeField(auto_now_add=True, auto_now=False)    
    updated_datetime = models.DateTimeField(default=timezone.now) 

    
    def __unicode__(self):
        return 'comment %s' % str(self.id)

    
    def __str__(self):
        return 'comment %s' % str(self.id)

    
    # class Meta:
        # ordering = ('created_datetime', 'updated_datetime')

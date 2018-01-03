# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.utils import timezone

from .models import Comment


class CommentAdmin(admin.ModelAdmin):
    
    list_display = ['id', 'user', 'article', 'parent', 'created_datetime', 'updated_datetime', ]
    
    def save_model(self, request, obj, form, change):
        
        obj.updated_datetime = timezone.now()
                    
        obj.save()
    
    
    class Meta():
        model = Comment

    
admin.site.register(Comment, CommentAdmin)
    
    
    
    

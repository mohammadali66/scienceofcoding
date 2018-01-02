# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils import timezone
from django.contrib import admin

from .models import Article
from clientUsers.models import Page

class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title_english', 'author', 'category',
                     'is_active', 'featured', 'view_count', 'created_datetime', 'updated_datetime',  ]
    
    filter_horizontal = ('tags',)
    prepopulated_fields = {'slug': (unicode('title_english'),)}
    
    def save_model(self, request, obj, form, change):
        
        if not change:            
#             page = Page(name=obj.slug)
#             page.save()
            pass
        
        #update datetime publication
        obj.updated_datetime = timezone.now()
                    
        obj.save()
    
    
    class Meta():
        model = Article

admin.site.register(Article, ArticleAdmin)





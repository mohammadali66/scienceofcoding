# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Category

class CategoryAdmin(admin.ModelAdmin):
    
    list_display = ['name', ]
    fields = ['name', 'slug', 'description', 'image', 'width_field', 'height_field', ]
    prepopulated_fields = {'slug': (unicode('name'),)}
    

admin.site.register(Category, CategoryAdmin)







# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Tag

class TagAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug', ]
    fields = ['name', 'slug', ]
    # prepopulated_fields = {'slug': (unicode('name'),)}
    prepopulated_fields = {'slug': (str('name'),)}



admin.site.register(Tag, TagAdmin)

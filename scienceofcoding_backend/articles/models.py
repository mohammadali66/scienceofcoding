# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from django.db.models.signals import post_save
# from django.core.urlresolvers import reverse
from django.urls import reverse

from ckeditor.fields import RichTextField

from categories.models import Category
from tags.models import Tag
from clientUsers.models import Page

# ...............................................................................................................
def upload_location(instance, filename):
    filebase, extension = filename.split('.')
    if len(instance.slug) > 20:
        return 'articleImage/%s.%s' % (instance.slug[0:20], extension)
    
    return 'articleImage/%s.%s' % (instance.slug, extension)
    
# ...............................................................................................................
class Article(models.Model):
    title_english    = models.CharField(max_length=120)
    title_farsi      = models.CharField(max_length=120)
    
    abstract_english = models.TextField(null=True, blank=True)
    abstract_farsi   = models.TextField(null=True, blank=True)
    
    content_english  = RichTextField(null=False, blank=False)
    content_farsi    = RichTextField(null=False, blank=False)
    
    slug             = models.SlugField(unique=True, allow_unicode=True)
    
    image            = models.ImageField(upload_to=upload_location, null=True, blank=True,
                                                    width_field='width_field', height_field='height_field')
    width_field      = models.IntegerField(default=0)
    height_field     = models.IntegerField(default=0)
    
    created_datetime = models.DateTimeField(auto_now_add=True, auto_now=False)    
    updated_datetime = models.DateTimeField(default=timezone.now)
    
    is_active        = models.BooleanField(default=True)
    featured         = models.BooleanField(default=False)
    view_count       = models.IntegerField(default=0, null=True)
    
    author           = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    category         = models.ForeignKey(Category, on_delete=models.CASCADE, default=1)
    tags             = models.ManyToManyField(Tag, blank=True)
    
    
    def __unicode__(self):
        return self.title_english
     
     
    def __str__(self):
        return self.title_english
     
    
    def get_api_url(self):
        return reverse('article-api:detail', kwargs={'slug': self.slug})
    
    
    class Meta:
        unique_together = ('title_english', 'slug')
        ordering = ('created_datetime', 'updated_datetime')
    
# ...............................................................................................................
def post_save_article_receiver(sender, instance, *args, **kwargs):
    try:
        page = Page.objects.get(name=instance.slug)
    except Page.DoesNotExist:
        page = Page(name=instance.slug, article=instance)
        page.save()
 
post_save.connect(post_save_article_receiver, sender=Article)     









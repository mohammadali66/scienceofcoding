from django.db import models

from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from ckeditor.fields import RichTextField
from django.utils.text import slugify

from django.contrib.auth.models import User

# .........................................................................................................
# create Token for each user

@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
    
# .........................................................................................................
def upload_location(instance, filename):
    filebase, extension = filename.split('.')
    return 'userImage/%s.%s' % (instance.user.username, extension)

# .........................................................................................................
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    slug = models.SlugField(unique=True, allow_unicode=True, null=True)
    avatar = models.ImageField(upload_to=upload_location, null=True, blank=True,
                                                    width_field='width_field', height_field='height_field')    
    width_field = models.IntegerField(default=0)
    height_field = models.IntegerField(default=0)
    
    description_english = RichTextField(null=True, blank=True)
    description_farsi = RichTextField(null=True, blank=True)


# .........................................................................................................
# def create_slug(instance):
#     newSlug = slugify(instance.user.userName, allow_unicode=True)
#     return newSlug
# 
# #.........................................................................................................
# def pre_save_post_receiver(sender, instance, *args, **kwargs):
#     if not instance.slug:
#         instance.slug = create_slug(instance)
# 
# pre_save.connect(pre_save_post_receiver, sender=UserProfile)




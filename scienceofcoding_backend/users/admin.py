from django.contrib import admin

from django.utils.text import slugify
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
 
from . import models
 
class UserProfileInline(admin.StackedInline):
    model = models.UserProfile
    can_delete = False
    verbose_name_plural = 'userProfile'
    
    fields = ('slug', 'avatar', 'width_field', 'height_field', 'description_english', 'description_farsi',)
    # prepopulated_fields = {'slug': (unicode('user'),)}
    
    def save_model(self, request, obj, form, change):
        
        if not change:            
#             page = Page(name=obj.slug)
#             page.save()
            pass
        
        # update datetime publication
        # obj.slug = slugify(obj.user.userName, allow_unicode=True)
                    
        obj.save()
    
  
# .......................................................................................................
class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)
      
      
# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)




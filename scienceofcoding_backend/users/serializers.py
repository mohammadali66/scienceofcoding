from rest_framework.serializers import ModelSerializer, SerializerMethodField

from django.contrib.auth.models import User

from .models import UserProfile

class UserListSerializer(ModelSerializer):
    
    class Meta:
        model = User
        fields = (
            'username',
            'email',
        )

#...............................................................................................................
class UserBriefSerializer(ModelSerializer):
    
    username = SerializerMethodField()
    slug = SerializerMethodField()
    class Meta:
        model = User
        fields = (
            'username',
            'slug',
        )
    
    def get_username(self, obj):
        if obj.first_name and obj.last_name:
            return '%s %s' %(obj.first_name, obj.last_name)
        return obj.username
    
    def get_slug(self, obj):
        if obj.userprofile.slug:
            return obj.userprofile.slug
        return ''

#...............................................................................................................
class UserProfileSerializer(ModelSerializer):
    
#     avatar = SerializerMethodField()
#     description_english = SerializerMethodField()
#     slug = SerializerMethodField()
    username   = SerializerMethodField()
    first_name = SerializerMethodField()
    last_name  = SerializerMethodField()
    
    
    class Meta:
        model = UserProfile
        fields = (
                    'username',
                    'first_name',
                    'last_name',
                    'avatar',
                    'description_english',
                    'slug',
                )
    
    def get_username(self, obj):
        return obj.user.username

    
    def get_first_name(self, obj):
        if obj.user.first_name:
            return obj.user.first_name
        return ''
    
    def get_last_name(self, obj):
        if obj.user.last_name:
            return obj.user.last_name
        return ''
    
#     def get_avatar(self, obj):
#         if obj.userprofile.avatar:
#             return obj.userprofile.avatar
#         return ''
#     
# 
#     def get_description_english(self, obj):
#         if obj.userprofile.description_english:
#             return obj.userprofile.description_english
#         return ''
# 
# 
#     def get_slug(self, obj):
#         if obj.userprofile.slug:
#             return obj.userprofile.slug
#         return ''
    



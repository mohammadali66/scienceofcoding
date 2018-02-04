from rest_framework.serializers import ModelSerializer, SerializerMethodField
from rest_framework.authtoken.models import Token
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
    slug     = SerializerMethodField()
    avatar   = SerializerMethodField()
    
    class Meta:
        model = User
        fields = (
            'username',
            'slug',
            'avatar',
        )
    
    def get_username(self, obj):
        if obj.first_name and obj.last_name:
            return '%s %s' %(obj.first_name, obj.last_name)
        return obj.username
    
    def get_slug(self, obj):
        try:
            return obj.userprofile.slug
        except:
            return ''
        
    
    def get_avatar(self, obj):
        try:
            return obj.userprofile.avatar.url
        except:
            return ''
        

#...............................................................................................................
class UserProfileSerializer(ModelSerializer):
    
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
    
#...............................................................................................................
class UserLoginSerializer(ModelSerializer):
    
    token = SerializerMethodField()
    
    class Meta:
        model = User
        fields = (
                    'username',
                    'email',
                    'password',                    
                    'token',
                )
        extra_kwargs = {
                            'username': {'read_only': True, },
                            'email': { 'write_only': True, },
                            'password': {'write_only': True, },                            
                            'token': { 'read_only': True, },
                        }


    def get_token(self, obj):
        
        mytoken = Token.objects.get(user=obj)
        return str(mytoken.key)

#...............................................................................................................
class UserRegisterSerializer(ModelSerializer):
    
    token = SerializerMethodField()
    
    class Meta:
        model = User
        fields = (
                    'username',
                    'email',
                    'password',
                    'token',              
                )
        extra_kwargs = {
                            'email': { 'write_only': True, },
                            'password': {'write_only': True, },                            
                            'token': { 'read_only': True, },
                        }


    def get_token(self, obj):
        
        mytoken = Token.objects.get(user=obj)
        return str(mytoken.key)





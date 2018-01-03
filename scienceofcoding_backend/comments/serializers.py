from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Comment
from users import serializers as users_serializers


class CommentSerializer(ModelSerializer):
    
    user             = SerializerMethodField()
    article          = SerializerMethodField()    
    updated_datetime = SerializerMethodField()
    sub_comment_list = SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = (
                    'user',
                    'article',
                    'content',                    
                    'updated_datetime',
                    'sub_comment_list',
                )
    
    def get_user(self, obj):
        return users_serializers.UserBriefSerializer(obj.user).data
    
    
    def get_article(self, obj):
        return obj.article.slug
    
    
    def get_updated_datetime(self, obj):
        datetime_str = '%s/%s/%s - %02d:%02d' %(obj.updated_datetime.year,
                                            obj.updated_datetime.month,
                                            obj.updated_datetime.day,
                                            obj.updated_datetime.hour,
                                            obj.updated_datetime.minute)
        return datetime_str

    
    def get_sub_comment_list(self, obj):
        list = Comment.objects.filter(parent=obj).order_by('updated_datetime')
        return CommentSerializer(list, many=True).data






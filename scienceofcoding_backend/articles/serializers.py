from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Article
from comments.models import Comment
from tags import serializers as tags_serializers
from users import serializers as users_serializers
from comments import serializers as comments_serializers


class ArticleBriefSerializer(ModelSerializer):
    
    author = SerializerMethodField()
    updated_datetime = SerializerMethodField()
    
    class Meta:
        model = Article
        fields = (
                    'title_english',
                    'abstract_english',
                    'slug',
                    'image',
                    'updated_datetime',
                    'author',
                    'get_api_url',
                )

    def get_author(self, obj):
        return users_serializers.UserBriefSerializer(obj.author).data
    
    def get_updated_datetime(self, obj):
        return str(obj.updated_datetime.date())    

# ................................................................................................................
class ArticleSerializer(ModelSerializer):
    
    author           = SerializerMethodField()
    updated_datetime = SerializerMethodField()
    comment_count    = SerializerMethodField()
    tags             = SerializerMethodField()
    comment_list     = SerializerMethodField()    
    
    class Meta:
        model = Article
        fields = (
                    #'id',
                    'title_english',
                    'abstract_english',
                    'content_english',
                    'slug',
                    'image',
                    'updated_datetime',
                    'author',
                    'view_count',
                    'comment_count',
                    'tags',
                    'get_api_url',
                    'comment_list',
                )

    def get_author(self, obj):
        return users_serializers.UserBriefSerializer(obj.author).data
    
    def get_updated_datetime(self, obj):
        return str(obj.updated_datetime.date())    

    def get_tags(self, obj):
         
        seri = tags_serializers.TagSerializer(obj.tags, many=True).data
        return seri

    
    def get_comment_list(self, obj):
        
        list = Comment.objects.filter(
                                        article=obj,
                                        parent=None
                                      )
        
        return comments_serializers.CommentSerializer(list, many=True).data
    
    
    def get_comment_count(self, obj):
        return Comment.objects.filter(article=obj).count()
    
    
    



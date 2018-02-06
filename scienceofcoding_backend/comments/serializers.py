from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Comment
from articles.models import Article
from django.contrib.auth.models import User
from users import serializers as users_serializers


class CommentSerializer(ModelSerializer):
    
    user             = SerializerMethodField()
    article          = SerializerMethodField()    
    updated_datetime = SerializerMethodField()
    sub_comment_list = SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = (
                    'id',
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
        datetime_str = '%s/%s/%s - %02d:%02d' % (obj.updated_datetime.year,
                                            obj.updated_datetime.month,
                                            obj.updated_datetime.day,
                                            obj.updated_datetime.hour,
                                            obj.updated_datetime.minute)
        return datetime_str

    
    def get_sub_comment_list(self, obj):
        list = Comment.objects.filter(parent=obj).order_by('updated_datetime')
        return CommentSerializer(list, many=True).data


#................................................................................................................
class CommentCreateSerializerkljkljkljklj(ModelSerializer):
    
    articleSlug = SerializerMethodField()
    parentId    = SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = (
                    'articleSlug',
                    'parentId',
                    'content',
                )
                
    
    def get_articleSlug(self, obj):
        return obj.article.slug
    

    def get_parentId(self, obj):
        return obj.parent.id


    def create(self, validated_data):
        
        article_slug = validated_data['articleSlug']
        parent_id    = validated_data['parentId']
        content      = validated_data['content'] 


        article = Article.objects.get(slug=article_slug)
        if parent_id:
            parent = Comment.objects.get(parent_id)
        else:
            parent = None
        
        comment = Comment(
                            #user = self.context['request'].user,
                            user = User.objects.get(id=1),
                            article = article,
                            parent = parent,
                            content = content,
                        )
        comment.save()
        
        return validated_data


#................................................................................................................
class CommentCreateSerializer(ModelSerializer):
            
    class Meta:
        model = Comment
        fields = (
                    'article',
                    'parent',
                    'content',
                )
                
        
    def create(self, validated_data):
        
        article = validated_data['article']
        parent  = validated_data['parent']
        content = validated_data['content'] 
        
        comment = Comment(
                            user    = self.context['request'].user,                            
                            article = article,
                            parent  = parent,
                            content = content,
                        )
        comment.save()
        
        return validated_data






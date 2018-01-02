from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Category
from articles import serializers as article_serializers
from articles.models import Article


class CategoryListMenuSerializer(ModelSerializer):
    
    class Meta:
        model = Category
        fields = (
                    'name',
                    'slug',
                    #'get_api_url',
                )
#..............................................................................................................
class CategoryDetailSerializer(ModelSerializer):
    
    #articles = SerializerMethodField()
    
    class Meta:
        model = Category
        fields = (
                    'name',
                    'slug',
                    'description',
                    'image',
                    #'articles',
                )


#     def get_articles(self, obj):
#         articleList = Article.objects.filter(
#                                                 is_active=True,
#                                                 category=obj
#                                             )
#         articles = article_serializers.ArticleBriefSerializer(articleList, many=True).data
#         return articles
        







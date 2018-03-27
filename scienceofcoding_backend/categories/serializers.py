from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Category
from articles import serializers as article_serializers
from articles.models import Article


class CategoryListMenuSerializer(ModelSerializer):

    articles_count = SerializerMethodField();

    class Meta:
        model = Category
        fields = (
                    'name',
                    'slug',
                    'articles_count',
                    # 'get_api_url',
                )

    def get_articles_count(self, obj):
        try:
            count = Article.objects.filter(category=obj).count()
            return count
        except:
            return 0
# ..............................................................................................................
class CategoryDetailSerializer(ModelSerializer):
    
    # articles = SerializerMethodField()
    
    class Meta:
        model = Category
        fields = (
                    'name',
                    'slug',
                    'description',
                    'image',
                    # 'articles',
                )


#     def get_articles(self, obj):
#         articleList = Article.objects.filter(
#                                                 is_active=True,
#                                                 category=obj
#                                             )
#         articles = article_serializers.ArticleBriefSerializer(articleList, many=True).data
#         return articles
        
# ..............................................................................................................
class CategoryLastArticleSerializer(ModelSerializer):

    articles = SerializerMethodField()

    class Meta:
        model = Category
        fields = (
                    'name',
                    'slug',
                    'articles',
                )

    def get_articles(self, obj):
        articleList = Article.objects.filter(is_active=True, category=obj).order_by('-updated_datetime')[:3]
        articles = article_serializers.ArticleBriefSerializer(articleList, many=True).data
        return articles





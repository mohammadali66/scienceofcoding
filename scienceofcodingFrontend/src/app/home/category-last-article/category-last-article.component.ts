import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-category-last-article',
  templateUrl: './category-last-article.component.html',
  styleUrls: ['./category-last-article.component.css']
})
export class CategoryLastArticleComponent implements OnInit {

  categoryList: Array<Category> = new Array<Category>();
  articleList_forDisplay: Array<Article> = new Array<Article>();
  all_articles: Array<Article> = new Array<Article>();

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategoryLastArticle().subscribe(
      (data: any) => {
        console.log(data);
        for(let cat of data){
          let category: Category = new Category();
          category.name = cat.name;
          category.slug = cat.slug;

          let articleList: Array<Article> = new Array<Article>();
          for(let art of cat.articles){
            let article: Article = new Article();
            article.title_english = art.title_english;
            article.abstract_english = art.abstract_english;
            article.slug = art.slug;
            article.image = art.image;
            article.updated_date = art.updated_datetime;
            articleList.push(article);

            //initialize articleList_forDisplay for All option
            this.articleList_forDisplay.push(article);
            //store all articles:
            this.all_articles = this.articleList_forDisplay;
          }
          category.category_articles = articleList;
          this.categoryList.push(category);
        }
      }
    );
  }
  //............................................................................
  getArticles(index:any){
    console.log(index);
    if(index >= 0 ){
      this.articleList_forDisplay = null;
      this.articleList_forDisplay = this.categoryList[index].category_articles;
    }else if(index == -1){
      this.articleList_forDisplay = this.all_articles;
    }

  }

}

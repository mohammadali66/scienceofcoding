import { Component, OnInit, OnDestroy } from '@angular/core';

import { Category } from '../models/category.model';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';
import { WebsocketService } from '../services/websocket.service';
import { CategoryService } from '../services/category.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  // categoryList: Array<Category> = new Array<Category>();
  lastArticleList: Array<Article> = new Array<Article>();

  constructor(private websocketService: WebsocketService,
              private categoryService: CategoryService,
              private articleService: ArticleService) { }

  ngOnInit() {
    //websocket  .............................................
    this.websocketService.clientUserSocket("homeRoom");
    //........................................................

    // this.categoryService.getCategoryLastArticle().subscribe(
    //   (data: any) => {
    //     console.log(data);
    //     for(let cat of data){
    //       let category: Category = new Category();
    //       category.name = cat.name;
    //       category.slug = cat.slug;
    //
    //       let articleList: Array<Article> = new Array<Article>();
    //       for(let art of cat.articles){
    //         let article: Article = new Article();
    //         article.title_english = art.title_english;
    //         article.slug = art.slug;
    //         article.image = art.image;
    //         articleList.push(article);
    //       }
    //       category.category_articles = articleList;
    //       this.categoryList.push(category);
    //     }
    //   }
    // );

    //last article count 3 ...................................
    this.articleService.getLastArticle('3').subscribe(
      (data: any) => {
        for(let art of data){
          let article: Article = new Article();
          article.title_english = art.title_english;
          article.abstract_english = art.abstract_english;
          article.slug = art.slug;
          article.image = art.image;

          article.author = new User();
          article.author.username = art.author.username;
          article.author.slug = art.author.slug;

          article.updated_date = art.updated_datetime;
          article.url = art.get_api_url;

          this.lastArticleList.push(article);
        }
      }
    );
    //........................................................
    window.scrollTo(0, 0);    //scroll to top page
  }

  ngOnDestroy(){
    console.log("home destroy");
    this.websocketService.closeWebsocket();
  }

}

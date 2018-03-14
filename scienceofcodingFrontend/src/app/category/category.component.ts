import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Category } from '../models/category.model';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';
import { CategoryService } from '../services/category.service';
import { ArticleService } from '../services/article.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
  category: Category = new Category();
  previous: string = null;
  next: string = null;

  constructor(private categoryService: CategoryService,
              private articleService: ArticleService,
              private websocketService: WebsocketService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //get category slug from url ...............................
    this.route.params.subscribe(
      (params: Params) => {
        this.category.slug = params['categoryslug'];

        //get category detail information from API ..............
        this.categoryService.getCategoryDetail(this.category.slug)
          .subscribe(
            (data: any) => {

              //websocket  .............................................
              let page_name = 'category-' + this.category.slug;
              //let page_name = 'category';
              if(this.websocketService.isCalled){
                this.websocketService.closeWebsocket();
              }
              this.websocketService.clientUserSocket(page_name);
              //......................................................

              this.category.name = data.name;
              this.category.description = data.description;
              this.category.image = data.image;
            }
          );

          //get articles list of category from API ...................
          this.articleService.getArticlesOfOneCategory(this.category.slug)
            .subscribe(
              (data: any) => {
                //console.log(data);
                this.category.category_articles = new Array<Article>();
                for(let art of data.results){
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

                  this.category.category_articles.push(article);
                }
                this.previous = data.previous;
                this.next = data.next;
                //console.log('ssss ' + this.category.category_articles);
              }
            );
      });
      window.scrollTo(0, 0);    //scroll to top page

  }
  //............................................................................
  nextPage(which: string){
    let pageUrl = '';
    if(which === 'next'){
      pageUrl = this.next;
    }else if(which === 'previous'){
      pageUrl = this.previous;
    }
    this.articleService.getArticlesOfOneCategory(this.category.slug, pageUrl)
      .subscribe(
        (data: any) => {

          this.category.category_articles = new Array<Article>();
          for(let art of data.results){
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

            this.category.category_articles.push(article);
          }
          this.previous = data.previous;
          this.next = data.next;
        },
        (error) => console.log(error)
      );
  }

  //............................................................................
  ngOnDestroy(){
    this.websocketService.closeWebsocket();
  }
}

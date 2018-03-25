import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Tag } from '../models/tag.model';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';
import { Category } from '../models/category.model';

import { TagService } from '../services/tag.service';
import { ArticleService } from '../services/article.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit, OnDestroy {
  tag: Tag = new Tag();
  articleList: Array<Article> = new Array<Article>();
  previous: string = null;
  next: string = null;

  constructor(private tagService: TagService,
              private articleService: ArticleService,
              private route: ActivatedRoute,
              private websocketService: WebsocketService
              ) { }

  ngOnInit() {
    //get tag slug from url .....................................
    this.route.params.subscribe(
      (params: Params) => {
        this.tag.slug = params['tagslug'];

        //get tag detail information from API ...................
        this.tagService.getTag(this.tag.slug)
          .subscribe(
            (data: any) => {
              this.tag.name = data.name;

              //websocket  .............................................
              let page_name = 'tag-' + this.tag.slug;
              //let page_name = 'category';
              if(this.websocketService.isCalled){
                this.websocketService.closeWebsocket();
              }
              this.websocketService.clientUserSocket(page_name);
              //......................................................

            }
          );

          //get articles list of category from API ...................
          this.articleService.getArticlesOfOneTag(this.tag.slug)
            .subscribe(
              (data: any) => {
                this.articleList = new Array<Article>();

                for(let art of data.results){
                  let article: Article = new Article();
                  article.title_english = art.title_english;
                  article.abstract_english = art.abstract_english;
                  article.slug = art.slug;
                  article.image = art.image;

                  article.author = new User();
                  article.author.username = art.author.username;
                  article.author.slug = art.author.slug;
                  article.author.avatar = art.author.avatar;

                  let category: Category = new Category();
                  category.name = art.category.name;
                  category.slug = art.category.slug;
                  article.category = category;

                  article.updated_date = art.updated_datetime;
                  article.url = art.get_api_url;

                  this.articleList.push(article);
                }
                this.previous = data.previous;
                this.next = data.next;
              }
            );
      }
      window.scrollTo(0, 0);    //scroll to top page
    );

  }

  //............................................................................
  nextPage(which: string){
    let pageUrl = '';
    if(which === 'next'){
      pageUrl = this.next;
    }else if(which === 'previous'){
      pageUrl = this.previous;
    }
    this.articleService.getArticlesOfOneTag(this.tag.slug, pageUrl)
      .subscribe(
        (data: any) => {
          this.articleList = new Array<Article>();

          for(let art of data.results){
            let article: Article = new Article();
            article.title_english = art.title_english;
            article.abstract_english = art.abstract_english;
            article.slug = art.slug;
            article.image = art.image;

            article.author = new User();
            article.author.username = art.author.username;
            article.author.slug = art.author.slug;
            article.author.avatar = art.author.avatar;

            let category: Category = new Category();
            category.name = art.category.name;
            category.slug = art.category.slug;
            article.category = category;

            article.updated_date = art.updated_datetime;
            article.url = art.get_api_url;

            this.articleList.push(article);
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

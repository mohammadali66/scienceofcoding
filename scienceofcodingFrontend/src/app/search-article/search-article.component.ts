import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Category } from '../models/category.model';
import { Article } from '../models/article.model';
import { User } from '../models/user.model';
import { CategoryService } from '../services/category.service';
import { ArticleService } from '../services/article.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.css']
})
export class SearchArticleComponent implements OnInit {

  searchstring: string;
  articleList: Array<Article> = new Array<Article>();

  constructor(private articleService: ArticleService,
              private websocketService: WebsocketService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //websocket  .............................................
    let page_name = 'search_page';
    if(this.websocketService.isCalled){
      this.websocketService.closeWebsocket();
    }
    this.websocketService.clientUserSocket(page_name);

    //get query param ........................................
    this.route.queryParams.subscribe(
      params => {
        this.searchstring = params['q'] || '';

        //Searching via calling http service  ................
        this.articleService.getSearchArticle(this.searchstring).subscribe(
          (data: any) => {
            this.articleList = new Array<Article>();
            for(let art of data){
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
          }
        );
      }
    );

    //........................................................
    window.scrollTo(0, 0);    //scroll to top page
  }

  //----------------------------------------------------------------------------
  ngOnDestroy(){
    this.websocketService.closeWebsocket();
  }
}

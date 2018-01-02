import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

//import { SafePipe } from '../safe.pipe';
import { ArticleService } from '../services/article.service';
import { WebsocketService } from '../services/websocket.service';
import { Article } from '../models/article.model';
import { Tag } from '../models/tag.model';
import { User } from '../models/user.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  private article: Article = new Article();

  constructor(private articleService: ArticleService,
              private websocketService: WebsocketService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {

    //get article slug from url ...............................
    this.route.params.subscribe(
      (params: Params) => {
        this.article.slug = params['articleslug'];

        //get category detail information from API ..............
        this.articleService.getArticle(this.article.slug)
          .subscribe(
            (data: any) => {

              //websocket  .............................................
              let page_name = this.article.slug;
              //let page_name = 'category';
              if(this.websocketService.isCalled){
                this.websocketService.closeWebsocket();
              }
              this.websocketService.clientUserSocket(page_name);
              //......................................................
                this.article.title_english = data.title_english;
                this.article.abstract_english = data.abstract_english;
                this.article.content_english = data.content_english;
                this.article.slug = data.slug;
                this.article.image = data.image;

                this.article.author = new User();
                this.article.author.username = data.author.username;
                this.article.author.slug = data.author.slug;

                this.article.updated_date = data.updated_datetime;

                this.article.tags = new Array<Tag>();
                for(let t of data.tags){
                  let tag: Tag = new Tag();
                  tag.name = t.name;
                  tag.slug = t.slug;
                  this.article.tags.push(tag);
                }
            }
          );
    });
  }
  //............................................................................
  ngOnDestroy(){
    this.websocketService.closeWebsocket();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

//import { SafePipe } from '../safe.pipe';
import { ArticleService } from '../services/article.service';
import { WebsocketService } from '../services/websocket.service';
import { Article } from '../models/article.model';
import { Tag } from '../models/tag.model';
import { User } from '../models/user.model';
import { Comment } from '../models/comment.model';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  loggedUsername: string = null;
  article: Article = new Article();
  newCommentContent: string = '';
  commentIdForDisplayReply = '0';

  constructor(private articleService: ArticleService,
              private websocketService: WebsocketService,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    //get article slug from url ...............................
    this.route.params.subscribe(
      (params: Params) => {
        this.article.slug = params['articleslug'];

        //if user logged in ..................................
        if(localStorage.getItem('username') !== ''){
          this.loggedUsername = localStorage.getItem('username');
        }else{
          this.loggedUsername = null;
        }

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
                this.article.id = data.id;
                this.article.title_english = data.title_english;
                this.article.abstract_english = data.abstract_english;
                this.article.content_english = data.content_english;
                this.article.slug = data.slug;
                this.article.image = data.image;
                this.article.view_count = data.view_count;

                this.article.author = new User();
                this.article.author.username = data.author.username;
                this.article.author.slug = data.author.slug;
                this.article.author.avatar = data.author.avatar;

                this.article.updated_date = data.updated_datetime;
                this.article.comment_count = data.comment_count;

                //category
                this.article.category = new Category();
                this.article.category.name = data.category.name;
                this.article.category.slug = data.category.slug;

                //...    tags List ..........
                this.article.tags = new Array<Tag>();
                for(let t of data.tags){
                  let tag: Tag = new Tag();
                  tag.name = t.name;
                  tag.slug = t.slug;
                  this.article.tags.push(tag);
                }

                //... comments List ..........
                this.article.comments = new Array<Comment>();
                for(let com of data.comment_list){
                  let comment: Comment = new Comment();
                  comment.id = com.id;

                  let userComment: User = new User();
                  userComment.username = com.user.username;
                  userComment.slug = com.user.slug;
                  userComment.avatar = com.user.avatar;
                  comment.user = userComment;

                  comment.article = com.article;
                  comment.content = com.content;
                  comment.updated_datetime = com.updated_datetime

                  //... sub comments
                  comment.sub_comment_list = new Array<Comment>();
                  for(let subCom of com.sub_comment_list){
                    let subComment: Comment = new Comment();
                    subComment.id = subCom.id;

                    let userComment2: User = new User();
                    userComment2.username = subCom.user.username;
                    userComment2.slug = subCom.user.slug;
                    userComment2.avatar = subCom.user.avatar;
                    subComment.user = userComment2;

                    subComment.article = subCom.article;
                    subComment.content = subCom.content;
                    subComment.updated_datetime = subCom.updated_datetime

                    comment.sub_comment_list.push(subComment);
                  }
                  this.article.comments.push(comment);
                }
            }
          );
    });
    window.scrollTo(0, 0);    //scroll to top page
  }
  //............................................................................
  addComment(content: string){
    let aComment: Comment = new Comment();
    let userComment: User = new User();
    userComment.username = localStorage.getItem('username');
    userComment.avatar = localStorage.getItem('avatar');
    aComment.user = userComment;
    aComment.content = content;
    aComment.updated_datetime = 'now';
    aComment.sub_comment_list = null;

    this.article.comments.push(aComment);
  }
  //............................................................................
  onDisplayReply(commentId: string){
    this.commentIdForDisplayReply = commentId;
  }

  //............................................................................
  addReplyComment(aComment: Comment){
    for(let com of this.article.comments){
      if(com.id == aComment.parentId){
        com.sub_comment_list.push(aComment);
        break;
      }
    }
  }
  //............................................................................
  ngOnDestroy(){
    this.websocketService.closeWebsocket();
  }
}

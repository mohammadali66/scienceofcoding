import { Component, OnInit, Input } from '@angular/core';

import { Comment } from '../../models/comment.model';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  //@Input() comment_list: Comment[];
  @Input() comment_list: Article;

  constructor() { }

  ngOnInit() {

    // for(let comment of this.comment_list){
    //   console.log(comment.user.username);
    console.log('comment_list: ' + this.comment_list.title_english);
    // }

  }

}

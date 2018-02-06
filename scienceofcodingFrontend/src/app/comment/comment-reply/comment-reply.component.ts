import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Comment } from '../../models/comment.model';
import { User } from '../../models/user.model';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-reply',
  templateUrl: './comment-reply.component.html',
  styleUrls: ['./comment-reply.component.css']
})
export class CommentReplyComponent implements OnInit {

  @Input() articleId: string = '';
  @Input() parentCommentId: string = '';
  @Output() newSubComment = new EventEmitter<Comment>();
  message: string = '';

  constructor(private commentService: CommentService) { }

  ngOnInit() {

  }

  //..........................................................................
  createCommentForm(form: NgForm){
  let aComment = {
    'article': this.articleId,
    'parent': this.parentCommentId,
    'content': form.value.content
  };

  this.commentService.createComment(aComment)
    .subscribe(
      (data: any) => {
        this.message = 'your reply created successfully.'

        let aSubComment: Comment = new Comment();
        let userComment: User = new User();
        userComment.username = localStorage.getItem('username');
        userComment.avatar = localStorage.getItem('avatar');
        aSubComment.user = userComment;
        aSubComment.parentId = this.parentCommentId;
        aSubComment.content = form.value.content;
        aSubComment.updated_datetime = 'now';
        aSubComment.sub_comment_list = null;

        this.newSubComment.emit(aSubComment);
      },
      (error: any) => { }
    );

  }

}

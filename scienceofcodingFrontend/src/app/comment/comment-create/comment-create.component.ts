import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {

  constructor(private commentService: CommentService) { }

  loggedUsername: string = null;
  @Input() articleId: string = '';
  @Output() commentContent = new EventEmitter<string>();
  message = '';

  ngOnInit() {
    if(localStorage.getItem('username') !== ''){
      this.loggedUsername = localStorage.getItem('username');
    }

  }

  //----------------------------------------------------------------------------
  createCommentForm(form: NgForm){
    let aComment = {
      'article': this.articleId,
      'parent': '',
      'content': form.value.content
    };
    this.commentService.createComment(aComment)
      .subscribe(
        (data: any) => {
          this.message = 'your comment has created, successfully!!';
          this.commentContent.emit(form.value.content);
        },
        (error: any) => {
          this.message = error;
        }
      );
  }

}

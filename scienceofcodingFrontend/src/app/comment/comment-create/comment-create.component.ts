import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {

  constructor() { }

  loggedUsername: string = null;
  @Input() articleSlug: string = '';

  ngOnInit() {
    if(localStorage.getItem('username') !== ''){
      this.loggedUsername = localStorage.getItem('username');
    }
    console.log('slug:  ' + this.articleSlug);
  }

}

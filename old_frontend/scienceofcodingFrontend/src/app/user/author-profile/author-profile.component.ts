import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-author-profile',
  templateUrl: './author-profile.component.html',
  styleUrls: ['./author-profile.component.css']
})
export class AuthorProfileComponent implements OnInit, OnDestroy {

  user: User = new User()

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private websocketService: WebsocketService) { }

  ngOnInit() {
    //get user slug from url ...............................
    this.route.params.subscribe(
      (params: Params) => {
        this.user.slug = params['userslug'];

        //get user detail information from API ..............
        this.userService.getUserProfile(this.user.slug)
          .subscribe(
            (data: any) => {

              //websocket  .............................................
              let page_name = 'author-' + this.user.slug;
              //let page_name = 'category';
              if(this.websocketService.isCalled){
                this.websocketService.closeWebsocket();
              }
              this.websocketService.clientUserSocket(page_name);
              //......................................................

              this.user.username = data.username;
              this.user.first_name = data.first_name;
              this.user.last_name = data.last_name;
              this.user.avatar = data.avatar;
              this.user.description_english = data.description_english;
            }
          );
      }
    );
  }
  //............................................................................
  ngOnDestroy(){
    this.websocketService.closeWebsocket();
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { WebsocketService } from '../../services/websocket.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorMessage: string;

  constructor(private authService: AuthService,
              private websocketService: WebsocketService,
              private router: Router,
              private location: Location) { }

  //----------------------------------------------------------------------------
  ngOnInit() {
    if(localStorage.getItem('username')){
      this.router.navigate(['/']);
    }
    //websocket  .............................................
    let page_name = 'login';
    this.websocketService.clientUserSocket(page_name);
    //......................................................

    window.scrollTo(0, 0);    //scroll to top page
  }
  //----------------------------------------------------------------------------
  loginUserForm(form: NgForm){

    let aUser = {
      email: form.value.email,
      password: form.value.password
    };

    this.authService.loginUser(aUser)
      .subscribe(
        (data: any) => {
          this.errorMessage = '';
          let user: User = new User();
          user.username = data.username;
          user.token = data.token;
          user.avatar = data.avatar;
          user.is_superuser = data.is_superuser;

          this.authService.loggedUser = user;

          localStorage.setItem('username', user.username);
          localStorage.setItem('token', user.token);
          localStorage.setItem('avatar', user.avatar);

          this.router.navigate(['/']);
        },
        (error) => {
          this.errorMessage = error;
        }
      );

  }
  //............................................................................
  ngOnDestroy(){
    this.websocketService.closeWebsocket();
  }
}

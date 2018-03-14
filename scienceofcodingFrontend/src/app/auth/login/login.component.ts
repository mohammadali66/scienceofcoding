import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { WebsocketService } from '../../services/websocket.service';

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
          localStorage.setItem('username', data.username);
          localStorage.setItem('token', data.token);
          localStorage.setItem('avatar', data.avatar);
          this.authService.isLogged = true;
          this.errorMessage = '';
          //this.router.navigate([this.router.url]);
          window.location.reload();
          //this.location.back();

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

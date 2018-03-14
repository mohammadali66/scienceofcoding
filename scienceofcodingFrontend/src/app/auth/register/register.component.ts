import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  errorMessage: string;

  constructor(private authService: AuthService,
              private websocketService: WebsocketService,
              private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('username')){
      this.router.navigate(['/']);
    }
    //websocket  .............................................
    let page_name = 'register';
    this.websocketService.clientUserSocket(page_name);

    window.scrollTo(0, 0);    //scroll to top page
  }
  //............................................................................
  registerUserForm(form: NgForm){
    let aUser = {
      username: form.value.username,
      email: form.value.email,
      password: form.value.password
    };

    this.authService.registerUser(aUser)
      .subscribe(
        (data: any) => {
          localStorage.setItem('username', data.username);
          localStorage.setItem('token', data.token);
          localStorage.setItem('avatar', data.avatar);
          this.authService.isLogged = true;
          this.errorMessage = '';

          window.location.reload();
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

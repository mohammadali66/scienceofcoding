import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router,
              private location: Location) { }

  //----------------------------------------------------------------------------
  ngOnInit() {
    if(localStorage.getItem('username')){
      this.router.navigate(['/']);
    }
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
}

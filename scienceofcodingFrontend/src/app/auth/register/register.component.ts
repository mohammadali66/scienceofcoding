import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('username')){
      this.router.navigate(['/']);
    }
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
          this.authService.isLogged = true;
          this.errorMessage = '';

          window.location.reload();
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }
}

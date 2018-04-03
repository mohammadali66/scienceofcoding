import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { User } from '../models/user.model';
import { MainService } from './main.service';

@Injectable()
export class AuthService{
  
  loggedUser: User;

  constructor(private http: Http,
              private mainService: MainService){
    //if user logged in set loggedUser property
    if(localStorage.getItem('username')){
      this.loggedUser = new User();
      this.loggedUser.username = localStorage.getItem('username');
      this.loggedUser.token = localStorage.getItem('token');
      this.loggedUser.avatar = localStorage.getItem('avatar');
      this.loggedUser.is_superuser = Boolean(localStorage.getItem('is_superuser'));
    }else{
      this.loggedUser = null;
    }
  }

  private mainUrl = this.mainService.mainUrl;
  //............................................................................
  loginUser(aUser: any){
  let url = this.mainUrl + '/api/user/login/?format=json';

  return this.http.post(url, aUser)
    .map(
      (response: Response) => {
        const data = response.json();
        return data;
      }
    )
    .catch(
      (error: Response) => {
        let rr = error.json();
        return Observable.throw(rr.errorMessage);
      }
    );
  }

  //............................................................................
  registerUser(aUser: any){
  let url = this.mainUrl + '/api/user/register/?format=json';

  return this.http.post(url, aUser)
    .map(
      (response: Response) => {
        const data = response.json();
        return data;
      }
    )
    .catch(
      (error: Response) => {
        let rr = error.json()
        return Observable.throw(rr.errorMessage);
      }
    );
  }

}

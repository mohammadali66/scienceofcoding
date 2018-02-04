import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthService{
  private mainUrl = 'http://127.0.0.1:8000';
  public isLogged = false;
  constructor(private http: Http){}

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

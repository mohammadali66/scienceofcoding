import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { MainService } from './main.service';

@Injectable()
export class UserService{  

  constructor(private http: Http,
              private mainService: MainService){}

  private mainUrl = this.mainService.mainUrl;
  //............................................................................
  getUserProfile(userSlug: string){
    let url = this.mainUrl + '/api/user/detail/' + userSlug +'/?format=json';
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');

    // return this.http.get(url, headers)
    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }
  //............................................................................
  getUserList(){
    let url = this.mainUrl + '/users/?format=json';
    let headers = new Headers();
    headers = new Headers({ 'Authorization': 'Token ' + '38791cfe2e406f6b1c17f1159c34ddffc4cdd8e1' });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
      .map(
        (response:Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }
  //............................................................................

}

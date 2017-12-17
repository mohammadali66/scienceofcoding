import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService{
  mainUrl = 'http://127.0.0.1:8000';

  constructor(private http: Http){}

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
          //console.log(data);
        }
      )
      .catch(
        (error: Response) => {
          //console.log(error);
          return Observable.throw(error);
        }
      );
  }
}

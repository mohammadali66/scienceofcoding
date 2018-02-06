import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommentService{
  private mainUrl = 'http://127.0.0.1:8000';

  constructor(private http: Http){}

  //...........................................................................
  createComment(aComment: any){
    let url = this.mainUrl + '/api/comment/create/?format=json';
    let headers = new Headers();

    if(localStorage.getItem('token') !== ''){
      headers = new Headers({ 'Authorization': 'Token ' + localStorage.getItem('token') });
    }else{
      headers = new Headers({});
    }
    let options = new RequestOptions({ headers: headers });

    return this.http.post(url, aComment, options)
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
}

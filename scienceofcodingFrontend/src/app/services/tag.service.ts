import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TagService{
  private mainUrl = 'http://127.0.0.1:8000';

  constructor(private http: Http){}

  //............................................................................
  getTag(tagSlug: string){
    let url = this.mainUrl + '/api/tag/detail/' + tagSlug +'/?format=json';
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');

    // return this.http.get(url, headers)
    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          console.log(data);
          return data;
        }
      );
  }
}

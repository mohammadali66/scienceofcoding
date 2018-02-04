import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class CategoryService{
  private mainUrl = 'http://127.0.0.1:8000';

  constructor(private http: Http){}

  //............................................................................
  getCategoryListMenu(){
    let url = this.mainUrl + '/api/category/categorylist/?format=json';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.get(url, headers)
      .map(
        (response: Response) => {
          const data = response.json();
          //console.log(JSON.parse(response));
          return data;
        }
      );
  }

  //............................................................................
  getCategoryDetail(categorySlug: string){
    let url = this.mainUrl + '/api/category/detail/' + categorySlug +'/?format=json';
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.get(url, headers)
      .map(
        (response: Response) => {
          const data = response.json();
          // console.log(data);
          return data;
        }
      );
  }
}

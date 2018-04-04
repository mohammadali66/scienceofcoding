import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Category } from '../models/category.model';
import { MainService } from './main.service';

@Injectable()
export class CategoryService{  

  constructor(private http: Http,
              private mainService: MainService){}

  private mainUrl = this.mainService.mainUrl;
  //............................................................................
  getCategoryListMenu(){
    let url = this.mainUrl + '/api/category/categorylist/?format=json';
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
  getCategoryDetail(categorySlug: string){
    let url = this.mainUrl + '/api/category/detail/' + categorySlug +'/?format=json';

    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          const data = error.json();
          return data;
        }
      );
  }

  //............................................................................
  getCategoryLastArticle(){
    let url = this.mainUrl + '/api/category/categorylastarticle/?format=json';

    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }
}

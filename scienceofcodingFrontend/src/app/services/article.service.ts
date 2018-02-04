import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ArticleService{
  private mainUrl = 'http://127.0.0.1:8000';

  constructor(private http: Http){}

  //...........................................................................
  //get books list of a category
  getArticlesOfOneCategory(categorySlug: string, pageUrl=null){
    let url: string = '';
    if(!pageUrl){
        url = this.mainUrl + '/api/article/articlescategory/' + categorySlug + '/?format=json';
    }else{
      url = pageUrl;
    }

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

  //...........................................................................
  //get books list of a category
  getArticlesOfOneTag(tagSlug: string, pageUrl=null){
    let url: string = '';
    if(!pageUrl){
        url = this.mainUrl + '/api/article/articlestag/' + tagSlug + '/?format=json';
    }else{
      url = pageUrl;
    }

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

  //...........................................................................
  //get books list of a category
  getArticle(slug: string, pageUrl=null){
    let url: string = '';
    if(!pageUrl){
        url = this.mainUrl + '/api/article/detail/' + slug + '/?format=json';
    }else{
      url = pageUrl;
    }

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
}

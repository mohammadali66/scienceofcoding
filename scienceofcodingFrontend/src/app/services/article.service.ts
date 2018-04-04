import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { MainService } from './main.service';

@Injectable()
export class ArticleService{  

  constructor(private http: Http,
              private mainService: MainService){}

  private mainUrl = this.mainService.mainUrl;

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
  //...........................................................................
  //get last article
  getLastArticle(count: string){

    let url = this.mainUrl + '/api/article/lastarticle/' + count + '/?format=json';

    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }
//...........................................................................
  //get most view article
  getMostViewArticle(count: string){
    let url = this.mainUrl + '/api/article/mostviewarticle/' + count + '/?format=json';

    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }

  //...........................................................................
  //Search Article
  getSearchArticle(query: string){
    let url = this.mainUrl + '/api/article/search/?q=' + query + '&format=json';

    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }
}

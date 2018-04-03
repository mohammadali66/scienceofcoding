import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { MainService } from './main.service';

@Injectable()
export class TagService{

  constructor(private http: Http,
              private mainService: MainService){}

  private mainUrl = this.mainService.mainUrl;
  //............................................................................
  getTag(tagSlug: string){
    let url = this.mainUrl + '/api/tag/detail/' + tagSlug +'/?format=json';

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
  getAllTag(){
    let url = this.mainUrl + '/api/tag/all/?format=json';

    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      );
  }
}

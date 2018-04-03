import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { AuthService } from './auth.service';
import { MainService } from './main.service';

@Injectable()
export class AnalyticsService{

  constructor(private http: Http,
              private authService: AuthService,
              private mainService: MainService){}

  private mainUrl = this.mainService.mainUrl;
  //............................................................................
  getOpenedPageOfOneDate(date: string){
    let url = this.mainUrl + '/api/analytics/pagelist/' + date +'/?format=json';
    let headers = new Headers();
    headers = new Headers({ 'Authorization': 'Token ' + this.authService.loggedUser.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
      .map(
        (response: Response) => {
          const data = response.json();

          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw("Date is invalid!!");
        }
      );
  }

  //............................................................................
  getOpenedPageOfTwoDate(fromdate: string, todate: string){
    let url = this.mainUrl + '/api/analytics/pagelist2/' + fromdate + '/' + todate +'/?format=json';
    let headers = new Headers();
    headers = new Headers({ 'Authorization': 'Token ' + this.authService.loggedUser.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
      .map(
        (response: Response) => {
          const data = response.json();

          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw("Date is invalid!!");
        }
      );
  }
  //............................................................................
  getCountViewFromDayUntilNow(day:number){
    let url = this.mainUrl + '/api/analytics/viewcount/' + day + '/?format=json';
    let headers = new Headers();
    headers = new Headers({ 'Authorization': 'Token ' + this.authService.loggedUser.token });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(url, options)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw("Date is invalid!!");
        }
      );
  }
}

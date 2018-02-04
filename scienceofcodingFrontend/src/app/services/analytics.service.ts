import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AnalyticsService{

  private mainUrl = 'http://127.0.0.1:8000';

  constructor(private http: Http){}

  //............................................................................
  getOpenedPageOfOneDate(date: string){
    let url = this.mainUrl + '/api/analytics/pagelist/' + date +'/?format=json';
    //let headers = new Headers();
    //headers.append('Content-Type', 'application/json');
    //headers.append('Access-Control-Allow-Origin', '*');

    //return this.http.get(url, headers)
    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          //console.log(JSON.parse(response));
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
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Origin', '*');

    // return this.http.get(url, headers)
    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          //console.log(JSON.parse(response));
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

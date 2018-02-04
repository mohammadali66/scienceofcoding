import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AnalyticsService } from '../services/analytics.service';
import { Page } from '../models/page.model';
import { ClientUserOpenedPage } from '../models/clientUserOpenedPage.model';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  date: Date = new Date();
  show;
  dayName;
  monthName;
  yearName;
  dayNg = "26";
  monthNg = "12";
  yearNg = "2017";
  fromdayNg = "26";
  frommonthNg = "12";
  fromyearNg = "2017";
  todayNg = "26";
  tomonthNg = "12";
  toyearNg = "2017";
  pageList: Array<Page>;
  constructor(private analyticsService: AnalyticsService) {
    // day :
    this.dayName = [
      {name: '1', value:'01'},
      {name: '2', value:'02'},
      {name: '3', value:'03'},
      {name: '4', value:'04'},
      {name: '5', value:'05'},
      {name: '6', value:'06'},
      {name: '7', value:'07'},
      {name: '8', value:'08'},
      {name: '9', value:'09'},
      {name: '10', value:'10'},
      {name: '11', value:'11'},
      {name: '12', value:'12'},
      {name: '13', value:'13'},
      {name: '14', value:'14'},
      {name: '15', value:'15'},
      {name: '16', value:'16'},
      {name: '17', value:'17'},
      {name: '18', value:'18'},
      {name: '19', value:'19'},
      {name: '20', value:'20'},
      {name: '21', value:'21'},
      {name: '22', value:'22'},
      {name: '23', value:'23'},
      {name: '24', value:'24'},
      {name: '25', value:'25'},
      {name: '26', value:'26'},
      {name: '27', value:'27'},
      {name: '28', value:'28'},
      {name: '29', value:'29'},
      {name: '30', value:'30'},
      {name: '31', value:'31'}
    ];

    //month :
    this.monthName = [
      {name: 'January', value:'01'},
      {name: 'February', value:'02'},
      {name: 'March', value:'03'},
      {name: 'April', value:'04'},
      {name: 'May', value:'05'},
      {name: 'June', value:'06'},
      {name: 'July', value:'07'},
      {name: 'August', value:'08'},
      {name: 'September', value:'09'},
      {name: 'October', value:'10'},
      {name: 'November', value:'11'},
      {name: 'December', value:'12'}
    ];

    //year :
    this.yearName = [
      {name: '2017', value:'2017'},
      {name: '2018', value:'2018'},
      {name: '2019', value:'2019'}
    ];

  }

  ngOnInit() {

  }

  //============================================================================
  getAnalyticsForOneDate(form: NgForm){
    let myDate = form.value.year + '-' + form.value.month + '-' + form.value.day;
    this.pageList = new Array<Page>();
    this.analyticsService.getOpenedPageOfOneDate(myDate).subscribe(
      (data: any) => {


        for(let p of data){
          let page: Page = new Page();
          page.name = p.name;

          let clientUserOpenedPageList: Array<ClientUserOpenedPage> = new Array<ClientUserOpenedPage>();
          for(let cp of p.clientUserOpenedPage_list){
            let clientUserOpenedPage: ClientUserOpenedPage = new ClientUserOpenedPage();
            clientUserOpenedPage.ip = cp.clientUser;
            clientUserOpenedPage.open_date = cp.open_date;
            clientUserOpenedPage.open_time = cp.open_time;
            clientUserOpenedPage.end_date = cp.end_date;
            clientUserOpenedPage.end_time = cp.end_time;
            clientUserOpenedPage.duration = cp.duration;

            clientUserOpenedPageList.push(clientUserOpenedPage);
          }
          page.clientUserOpenedPage_list = clientUserOpenedPageList;
          this.pageList.push(page);
        }


      }
    );
  }
  //============================================================================
  getAnalyticsForTwoDate(form: NgForm){
    let fromDate = form.value.fromyear + '-' + form.value.frommonth + '-' + form.value.fromday;
    let toDate = form.value.toyear + '-' + form.value.tomonth + '-' + form.value.today;
    this.pageList = new Array<Page>();

    this.analyticsService.getOpenedPageOfTwoDate(fromDate, toDate).subscribe(
      (data: any) => {


        for(let p of data){
          let page: Page = new Page();
          page.name = p.name;

          let clientUserOpenedPageList: Array<ClientUserOpenedPage> = new Array<ClientUserOpenedPage>();
          for(let cp of p.clientUserOpenedPage_list){
            let clientUserOpenedPage: ClientUserOpenedPage = new ClientUserOpenedPage();
            clientUserOpenedPage.ip = cp.clientUser;
            clientUserOpenedPage.open_date = cp.open_date;
            clientUserOpenedPage.open_time = cp.open_time;
            clientUserOpenedPage.end_date = cp.end_date;
            clientUserOpenedPage.end_time = cp.end_time;
            clientUserOpenedPage.duration = cp.duration;

            clientUserOpenedPageList.push(clientUserOpenedPage);
          }
          page.clientUserOpenedPage_list = clientUserOpenedPageList;
          this.pageList.push(page);
        }
      }
    );
  }
}

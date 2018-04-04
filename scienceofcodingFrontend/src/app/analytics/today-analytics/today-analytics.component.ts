import { Component, OnInit } from '@angular/core';

import { AnalyticsService } from '../../services/analytics.service';
import { Page } from '../../models/page.model';
import { ClientUserOpenedPage } from '../../models/clientUserOpenedPage.model';

@Component({
  selector: 'app-today-analytics',
  templateUrl: './today-analytics.component.html',
  styleUrls: ['./today-analytics.component.css']
})
export class TodayAnalyticsComponent implements OnInit {

  pageList: Array<Page>;

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit() {

    //initialize
    this.receive_today_data();

    //repeat
    setInterval(()=>{
      this.receive_today_data();
    },60000);   //every 1 minute
  }

  //............................................................................
  receive_today_data(){
    let myDate = '1000-01-01';   //a notation for today
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
            clientUserOpenedPage.country = cp.country;
            clientUserOpenedPage.city = cp.city;
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

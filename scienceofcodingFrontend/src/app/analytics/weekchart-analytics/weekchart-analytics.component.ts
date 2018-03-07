import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-weekchart-analytics',
  templateUrl: './weekchart-analytics.component.html',
  styleUrls: ['./weekchart-analytics.component.css']
})
export class WeekchartAnalyticsComponent implements OnInit {
  dayCount = 7;

  // lineChart
  public lineChartData:Array<any> = [
    {data: [this.dayCount], label: 'Series A'},
  ];
  public lineChartLabels:Array<any> = new Array<any>(this.dayCount);
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';


  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  //............................................................................
  constructor(private analyticsService: AnalyticsService) { }


  ngOnInit() {
    this.analyticsService.getCountViewFromDayUntilNow(this.dayCount).subscribe(
      (data: any) => {
        this.lineChartData = [{data: data.chart_data, label: 'viewer count'}];

        for(let i=0; i<this.dayCount; i++){
          this.lineChartLabels[i] = data.chart_title[i];
        }
      }

    );
  }
  //............................................................................

}

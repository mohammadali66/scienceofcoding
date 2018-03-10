import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-weekchart-analytics',
  templateUrl: './weekchart-analytics.component.html',
  styleUrls: ['./weekchart-analytics.component.css']
})
export class WeekchartAnalyticsComponent implements OnInit {

  @ViewChild("baseChart") chart: BaseChartDirective;  //name of chart from html
  dayCount = 7;
  private socket: any;

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

  //............................................................................
  ngOnInit() {
    this.analyticsService.getCountViewFromDayUntilNow(this.dayCount).subscribe(
      (data: any) => {
        this.lineChartData = [{data: data.chart_data, label: 'viewer count'}];
        for(let i=0; i<this.dayCount; i++){
          this.lineChartLabels[i] = data.chart_title[i];
        }
      }
    );
    //. . . . . . . . . . . . . . . . . . . . . . . . .
    this.refresh_data_chart();
  }
  //............................................................................
  refresh_data_chart(){
    //. . .refresh the chart every time_refresh . . . . . .
    let time_refresh = 60000 //millisecond
    //connect to server via websocket
    this.socket = new WebSocket("ws://localhost:8000/clientuser/");
    this.socket.onopen = function(){ }

    //repeat send function every time_refresh
    setInterval(()=>{
      let message = {
        repeattext: "heartbeat"
      };
      this.socket.send(JSON.stringify(message));
    },time_refresh);

    //receive data from server via websocket
    this.socket.onmessage = (event) => {
      let received_data = JSON.parse(event.data)
      this.lineChartData[0].data[0] = received_data.todaycount;

      //refresh data of chart
      if (this.chart !== undefined) {
         this.chart.chart.destroy();
         this.chart.chart = 0;

         this.chart.datasets = this.lineChartData;
         //this.chart.labels = this.labels;
         this.chart.ngOnInit();
      }
    };
  }
}

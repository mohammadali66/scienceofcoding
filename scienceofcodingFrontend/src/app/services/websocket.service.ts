import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class WebsocketService{

  private ipInfo: any;
  private socket: any;
  //private id:any;
  private data:any;
  public isCalled: boolean;
  constructor(private http: Http){
    //this.socket = new WebSocket("ws://localhost:8000/clientuser/");
    this.ipInfo = "";
    this.isCalled = false;
  }

  //............................................................
  //function getIPInfo --- by Http request
  getIPInfo(){
    let url = "http://ip-api.com/json";
    return this.http.get(url)
      .map(
        (response: Response) => {
          const data = response.json();
          return data;
        }
      )
      .catch(
        (error: Response) => {
          return Observable.throw(error);
        }
      );
  }
  //............................................................
  //function clientUserSocket
  clientUserSocket(room_name: string){
    this.isCalled = true;
    this.socket = new WebSocket("ws://localhost:8000/clientuser/");
    var _self = this;

    this.getIPInfo().subscribe(
      (data: any) => {
          //this.ipInfo = data;
          _self.ipInfo = data;
      }
    );
    _self.socket.onopen = function(){
      //let ipInfo = ipInfo2;


      let clientMessage = {
        ip_address: _self.ipInfo.query,
        isp: _self.ipInfo.isp,
        country: _self.ipInfo.country,
        city: _self.ipInfo.city,
        altitude: _self.ipInfo.lat,
        longitude: _self.ipInfo.lon,
        room_name: room_name,
        token: ""
      };
      //this.socket.send(JSON.stringify(clientMessage));
      _self.socket.send(JSON.stringify(clientMessage));
    };

    _self.socket.onmessage = (event) => {
      //console.log("data from socket:" + event.data);
      _self.data = JSON.parse(event.data);
    };
  }
  //............................................................
  //function close websocket
  closeWebsocket(){
    this.isCalled = false;
    this.socket.close();
  }
}

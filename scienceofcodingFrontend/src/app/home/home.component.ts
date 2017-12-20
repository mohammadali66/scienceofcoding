import { Component, OnInit, OnDestroy } from '@angular/core';

import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    this.websocketService.clientUserSocket("testRoom");

  }

  ngOnDestroy(){
    console.log("home destroy");
    this.websocketService.closeWebsocket();
  }

}

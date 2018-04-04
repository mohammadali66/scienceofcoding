import { Component, OnInit, OnDestroy } from '@angular/core';

import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit, OnDestroy {

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    //websocket  .............................................
    let page_name = 'about_us';
    this.websocketService.clientUserSocket(page_name);
    //......................................................

    window.scrollTo(0, 0);    //scroll to top page
  }

  //............................................................................
  ngOnDestroy(){
    this.websocketService.closeWebsocket();
  }
}

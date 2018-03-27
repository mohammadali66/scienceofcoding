import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    //websocket  .............................................
    let page_name = 'error_404';

    if(this.websocketService.isCalled){
      this.websocketService.closeWebsocket();
    }
    this.websocketService.clientUserSocket(page_name);
  }

  //----------------------------------------------------------------------------
  ngOnDestroy(){
    if(this.websocketService.isCalled){
      this.websocketService.closeWebsocket();
    }
  }

}

import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { WebSocketService } from '../websocket.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService,
              private webSocketService: WebSocketService
              ) { }

  ngOnInit() {
    var exampleSocket = new WebSocket("ws://localhost:8000/ws/");


    //let message = { text: "Hi"}

    exampleSocket.onopen = function (event) {
      let Mymessage = {
        content: "this is content",
        token: "38791cfe2e406f6b1c17f1159c34ddffc4cdd8e1"
      };
      //exampleSocket.send("Here's some text that the server is urgently awaiting!");
      //exampleSocket.send("heartbeat");
      exampleSocket.send(JSON.stringify(Mymessage));
    };
    //setInterval(() => {exampleSocket.send("heartbeat");}, 5000);

    exampleSocket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      if(data.type == "presence"){
        console.log('lurkers: ' + data.payload.lurkers);
        console.log('anonymous: ' + data.payload.anonymous);
        console.log('members: ' + data.payload.members);
      }
      else{
        //console.log(event.data);
      }


    };
    //setInterval(() => {exampleSocket.send("heartbeat");}, 5000);


    //message = { text: "heartbeat"}
    //setInterval(() => {exampleSocket.send(JSON.stringify(message));}, 5000);
    //setInterval(() => {exampleSocket.send(JSON.stringify("heartbeat"));}, 5000);

    //this.webSocketService.connect('ws://' + 'localhost:8000' + '/ws/');
    //let socket = new WebSocket('ws://' + 'localhost:8000' + '/ws/');
    // console.log(window.location.host);
    //
    // socket.onopen = () => {
    //   console.log('WebSockets connection created.');
    // };
    // socket.on('open') => {
    //   console.log('WebSockets connection created.');
    // }

    // socket.onmessage = (event) => {
    //   console.log("data from socket:" + event.data);
    // };
    //setInterval(socket.send('senddddddddddddddd'), 10000);

    //socket.send('senddddddddddddddd');
    //socket.send(JSON.stringify(message));
    //.......................................
    this.userService.getUserList()
      .subscribe(
        (data:any) => {
          console.log('aliiiiiiiiiiiii');
          console.log(data);
        },
        (error) => {
          console.log('errorrrrrrrrrrrrrr');
          console.log(error);
        }
      );

  }

}

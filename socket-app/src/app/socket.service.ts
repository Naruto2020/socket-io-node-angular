import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { io } from 'socket.io-client'; // (1) import io module

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // first of all create the socket object and set server url (1)
  socket:any; // (2) create socket object
  url:string = "http://localhost:5000"; // (3) initialise url


  constructor() {
    //this.socket = io(this.url);
  }
  // dont forget to provide socket service to app.module.ts (4)
  socketConnexions(){
    this.socket = io(this.url,{
      auth:{
        token: "secretCodeloll" // Bonus : You can also send query parameters to the Backend when connecting to the socket by using options with url in a connection.
      }
    }); // (5) write socket init function then go on app.component.ts

    // after step (6) you can (emit) send your first message to server by 'my message' event !!!
    this.socket.emit('my message', 'Hello there from Angular.');
    // and listening message from server
    this.socket.on('my broadcast', (data:string)=>{
      console.log(data);
    });

  }


}

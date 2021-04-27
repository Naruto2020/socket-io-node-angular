import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { io } from 'socket.io-client'; // (1) import io module
import{HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // first of all create the socket object and set server url (1)
  socket:any; // (2) create socket object
  url:string = "http://localhost:5000"; // (3) initialise url
  logUrl:string = "http://127.0.0.1:5000/api/users/login"


  constructor(private http:HttpClient) {
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

  // chat

  login(data:any){
    this.socket = io(this.url);
    this.socket.emit("connexion", data);
  }

  severValidateLog(){
    this.socket = io(this.url);
    let observable = new Observable<any>(observer=>{
      this.socket.on('connexionRep', (data:any)=>{
        //const sockId = this.socket.id;
        //console.log("rep",data);
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }

  sendMessage(data:any){
    this.socket = io(this.url);
    this.socket.emit("message", {data: data, id: localStorage.getItem("loggedUser")});
  }

  newMessageRecieved(){
    this.socket = io(this.url);
    let observable = new Observable<any>(observer=>{
      this.socket.on('new message', (data:any)=>{
        //const sockId = this.socket.id;
        observer.next(data);
      });

      return () => {this.socket.disconnect();}
    });
    return observable;
  }

  allMessageRecieved(){
    this.socket = io(this.url);
    let observable = new Observable<any>(observer=>{
      this.socket.on('display-mesg', (data:any)=>{
        //const sockId = this.socket.id;
        observer.next(data);
      });

      return () => {this.socket.disconnect();}
    });
    return observable;
  }


  signIn(data:any):Observable<any>{
    return this.http.post(this.logUrl, data);
  }
}

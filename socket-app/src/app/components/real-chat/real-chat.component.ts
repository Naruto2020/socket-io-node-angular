import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../socket.service';
import { io } from 'socket.io-client'
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm } from '@angular/forms';


@Component({
  selector: 'app-real-chat',
  templateUrl: './real-chat.component.html',
  styleUrls: ['./real-chat.component.scss']
})
export class RealChatComponent implements OnInit {


  message!: any;

  constructor(private sockService : SocketService) { }

  ngOnInit(): void {
    this.setSocketconnetion();

  }

  setSocketconnetion(){
    this.sockService.socketConnexions(); // (6) call socket function init after importing service modules ...
    this.sockService.newMessageRecieved().subscribe(data =>{
      console.log("voici:", data);
      console.log("yep", localStorage.getItem("loggedUser"));
      console.log("yup", sessionStorage.getItem("loggedEmail"));
      let store = localStorage.getItem("loggedUser");
      if(data && data.id !== store){
        const li = document.createElement("li");
        li.innerHTML = data.data;
        li.style.background = 'white';
        li.style.padding =  '15px 30px';
        li.style.margin = '10px';
        const liste = document.querySelectorAll("ul");
        const ul = liste[0];
        ul.appendChild(li);

      }
    });

  };

  SendMessage(){
    this.sockService.sendMessage(this.message);
    const li = document.createElement("li");
    li.innerHTML = this.message;
    li.style.background = 'white';
    li.style.padding =  '15px 30px';
    li.style.margin = '10px';
    li.style.textAlign = 'right';
    const liste = document.querySelectorAll("ul");
    const ul = liste[0];
    ul.appendChild(li);
    this.message = '';
  }

}

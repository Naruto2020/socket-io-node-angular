import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import {SocketService} from '../../socket.service';
import { io } from 'socket.io-client'
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm } from '@angular/forms';

/** pour afficher directement le dernier message avec un scroll down automatique il faut :
 * (1) importer : AfterViewChecked, ViewChild, ElementRef
 * (2) implement AfterViewChecked on export class after OnInit,
 * (3) déclarer le décorateur @ViewChild comme suis : @ViewChild('scrollMe')  private myScrollContainer!: ElementRef;
 * (4) initialisez une variable a false eg scrolledToBottom = false;
 * (5) initialisez  AfterViewChecked eg    ngAfterViewChecked() {this.scrollToBottom();}
 * (6) implémenter enssuite scrollToBottom() et onScroll() comme indiquer aux ligne 42 et 51
 * (7) aller dans le template html et dans la balise ouvrante contenant la liste y ajoutter #scrollMe , style="overflow: scroll; height: xyz;" et (scroll)="onScroll()"
 */

@Component({
  selector: 'app-real-chat',
  templateUrl: './real-chat.component.html',
  styleUrls: ['./real-chat.component.scss']
})
export class RealChatComponent implements OnInit, AfterViewChecked  {


  @ViewChild('scrollMe')  private myScrollContainer!: ElementRef;
  scrolledToBottom = false;

  //scrollMe
  message!: any;
  storage!:any;
  msgList!:any;
  online:boolean = false;

  constructor(private sockService : SocketService) { }

  ngOnInit(): void {
    //this.scrollToBottom();
    this.setSocketconnetion();
    /*this.sockService.severValidateLog().subscribe(data =>{
      if(data.success){
        this.online = true;
        console.log("on : ", this.online);
      }
    });*/
    this.storage = localStorage.getItem("loggedUser");
    if(this.storage){
      this.online = true;
    }

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      /**Add the condition**/
      if(!this.scrolledToBottom){
         this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }

  onScroll(){
    this.scrolledToBottom = true;
  }

  setSocketconnetion(){
    this.sockService.socketConnexions(); // (6) call socket function init after importing service modules ...

    this.sockService.allMessageRecieved().subscribe(data =>{
      console.log("all msg : ", data);

      this.msgList = data;
      // transform objet in to array
      /*var monTableau = Object.keys(data).map(function(cle) {
        return [Number(cle), data[cle]];
      });*/
      let arr1: any= [];
      for(let i= 0; i< data.length; i++){
        let messArr = data[i].mess;
        arr1.push(messArr);
      }
      let arr2:any = [];
      for(let j=0; j<arr1.length; j++){
        let messArr1 = arr1[j].id;
        arr2.push(messArr1);
      }
      //console.log ('new tab :', arr2);


    });

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
        li.style.width = "20%";
        li.style.textAlign = 'center';
        const liste = document.querySelectorAll("ul");
        const ul = liste[liste.length - 1];
        ul.appendChild(li);


      }
    });

  };

  SendMessage(){
    this.sockService.sendMessage(this.message);
    const li = document.createElement("li");
    li.innerHTML = this.message;
    li.style.background = 'blue';
    li.style.color = 'white';
    li.style.padding =  '15px 30px';
    li.style.margin = '10px';
    li.style.marginLeft = "69%";
    li.style.textAlign = 'center';
    li.style.width = "20%";
    const liste = document.querySelectorAll("ul");
    const ul = liste[liste.length - 1];
    ul.appendChild(li);
    this.message = '';
  }

}

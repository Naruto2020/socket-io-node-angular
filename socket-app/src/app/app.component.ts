import { Component, OnInit} from '@angular/core';
import {SocketService} from './socket.service';
import { io } from 'socket.io-client';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(){}

  ngOnInit() {

  }


}



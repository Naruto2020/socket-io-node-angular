import { Component, OnInit} from '@angular/core';
import {SocketService} from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'socket-app';

  constructor(private sockService : SocketService){}

  ngOnInit() {
    this.sockService.socketConnexions(); // (6) call socket function init after importing service modules ...
  }
}



import { Component, OnInit } from '@angular/core';

import {SocketService} from '../../socket.service';
import { io } from 'socket.io-client';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {
  title = 'socket-app';

  singForm = new FormGroup({
    email : new FormControl(""),
    password : new FormControl(""),
  });

  constructor(private sockService : SocketService, private router:Router) { }

  ngOnInit(): void {
    this.setSocketconnetion();
  }

  setSocketconnetion(){
    this.sockService.socketConnexions();
    this.sockService.severValidateLog().subscribe(data =>{
      console.log("vue",data);
    });
  };

  valider(){
    let formValue = this.singForm.value;
    this.sockService.signIn(formValue).subscribe(res =>{
      console.log("baba",res);
      localStorage.setItem("loggedUser",res.userId);
      sessionStorage.setItem("loggedEmail", res.email);
      console.log(localStorage.getItem("loggedUser"));
      this.router.navigate(["/chat"]);
      this.singForm.reset({});
    });

    this.sockService.severValidateLog().subscribe(result =>{
      if(result.success){
        console.log("vue",result);

      }
    });

    this.sockService.login(this.singForm.value);
    console.log("user connecter :",this.singForm.value);

  }

}

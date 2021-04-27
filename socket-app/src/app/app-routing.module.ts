import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {RealChatComponent} from './components/real-chat/real-chat.component';
import {SingInComponent} from './components/sing-in/sing-in.component';

const routes: Routes = [
  {path:"", component:SingInComponent},
  {path:"chat", component:RealChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

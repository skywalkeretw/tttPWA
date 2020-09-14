import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LocalComponent} from "./local/local.component";
import {OnlineComponent} from "./online/online.component";
import {SettingsComponent} from "./settings/settings.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'local', component: LocalComponent},
  {path: 'online', component: OnlineComponent},
  {path: 'settings', component: SettingsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

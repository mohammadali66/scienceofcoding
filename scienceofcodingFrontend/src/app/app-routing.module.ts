import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user/user-list/user-list.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserListComponent }
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{}

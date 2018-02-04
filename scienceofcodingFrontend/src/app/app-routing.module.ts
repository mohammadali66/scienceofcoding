import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CategoryComponent } from './category/category.component';
import { ArticleComponent } from './article/article.component';
import { TagComponent } from './tag/tag.component';
import { AuthorProfileComponent } from './user/author-profile/author-profile.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: 'user', component: UserListComponent },
  { path:'user', children: [
    { path: 'authorprofile/:userslug', component: AuthorProfileComponent }
  ]},
  { path: 'category/:categoryslug', component: CategoryComponent },
  { path: 'article/:articleslug', component: ArticleComponent },
  { path: 'tag/:tagslug', component: TagComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

  //{ path: 'category', component: CategoryComponent, outlet: 'articleBase' }
];

@NgModule({
  imports:[
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{}

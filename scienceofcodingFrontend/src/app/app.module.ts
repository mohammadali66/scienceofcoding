import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserService } from './user/user.service';
import { WebsocketService } from './services/websocket.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseComponent } from './base/base.component';
import { NavigationComponent } from './base/navigation/navigation.component';
import { FooterComponent } from './base/footer/footer.component';
import { ArticleComponent } from './article/article.component';
import { ArticleSideBarComponent } from './article/article-side-bar/article-side-bar.component';
import { ArticleBaseComponent } from './article/article-base/article-base.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    HomeComponent,
    BaseComponent,
    NavigationComponent,
    FooterComponent,
    ArticleComponent,
    ArticleSideBarComponent,
    ArticleBaseComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UserService, WebsocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }

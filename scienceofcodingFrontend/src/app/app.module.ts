import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

//import {DpDatePickerModule} from 'ng2-date-picker';
//import {DatePickerModule} from 'ng2-datepicker-bootstrap';
//import { MyDatePickerModule } from 'mydatepicker';
// import { NgDatepickerModule } from 'ng2-datepicker';

import { WebsocketService } from './services/websocket.service';
import { CategoryService } from './services/category.service';
import { ArticleService } from './services/article.service';
import { TagService } from './services/tag.service';
import { UserService } from './services/user.service';
import { AnalyticsService } from './services/analytics.service';
import { AuthService } from './services/auth.service';
import { CommentService } from './services/comment.service';

import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BaseComponent } from './base/base.component';
import { NavigationComponent } from './base/navigation/navigation.component';
import { FooterComponent } from './base/footer/footer.component';
import { ArticleComponent } from './article/article.component';
import { ArticleSideBarComponent } from './article/article-side-bar/article-side-bar.component';
import { ArticleBaseComponent } from './article/article-base/article-base.component';
import { CategoryComponent } from './category/category.component';
import { TagComponent } from './tag/tag.component';
import { SafePipe } from './safe.pipe';
import { AuthorProfileComponent } from './user/author-profile/author-profile.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CommentListComponent } from './comment/comment-list/comment-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CommentCreateComponent } from './comment/comment-create/comment-create.component';
import { NewDirectiveDirective } from './directives/new-directive.directive';
import { CommentReplyComponent } from './comment/comment-reply/comment-reply.component';
import { WeekchartAnalyticsComponent } from './analytics/weekchart-analytics/weekchart-analytics.component';
import { TodayAnalyticsComponent } from './analytics/today-analytics/today-analytics.component';
import { CategoryLastArticleComponent } from './home/category-last-article/category-last-article.component';
import { MostViewArticleComponent } from './home/most-view-article/most-view-article.component';

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
    ArticleBaseComponent,
    CategoryComponent,
    TagComponent,
    SafePipe,
    AuthorProfileComponent,
    AnalyticsComponent,
    CommentListComponent,
    LoginComponent,
    RegisterComponent,
    CommentCreateComponent,
    NewDirectiveDirective,
    CommentReplyComponent,
    WeekchartAnalyticsComponent,
    TodayAnalyticsComponent,
    CategoryLastArticleComponent,
    MostViewArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    UserService,
    WebsocketService,
    CategoryService,
    ArticleService,
    TagService,
    AnalyticsService,
    AuthService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

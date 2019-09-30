import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppComponent } from './app.component';
import { ProgressBarDotsComponent } from './progress-bar-dots/progress-bar-dots.component';
import { DaysProgressionComponent } from './days-progression/days-progression.component';

import { httpInterceptorProviders } from './http-interceptors';
import { CurrentActivityComponent } from './current-activity/current-activity.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { TimestampPresenterComponent } from './timestamp-presenter/timestamp-presenter.component';
import { BlogPostContentPresenterComponent } from './blog-post-content-presenter/blog-post-content-presenter.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, AngularSvgIconModule ],
  declarations: [ AppComponent, ProgressBarDotsComponent, DaysProgressionComponent,
                  CurrentActivityComponent, BlogPostsComponent, TimestampPresenterComponent, BlogPostContentPresenterComponent ],
  bootstrap:    [ AppComponent ],
  providers:    httpInterceptorProviders
})
export class AppModule { }

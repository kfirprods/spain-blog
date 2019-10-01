import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatVideoModule } from 'mat-video';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { GalleryModule } from '@ks89/angular-modal-gallery';

import { AppComponent } from './app.component';
import { ProgressBarDotsComponent } from './progress-bar-dots/progress-bar-dots.component';
import { DaysProgressionComponent } from './days-progression/days-progression.component';

import { httpInterceptorProviders } from './http-interceptors';
import { CurrentActivityComponent } from './current-activity/current-activity.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { TimestampPresenterComponent } from './timestamp-presenter/timestamp-presenter.component';
import { BlogPostContentPresenterComponent } from './blog-post-content-presenter/blog-post-content-presenter.component';
import { BlogMediaPresenterComponent } from './blog-media-presenter/blog-media-presenter.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, AngularSvgIconModule, BrowserAnimationsModule, MatVideoModule,
                  NgxYoutubePlayerModule.forRoot(), GalleryModule.forRoot() ],
  declarations: [ AppComponent, ProgressBarDotsComponent, DaysProgressionComponent,
                  CurrentActivityComponent, BlogPostsComponent, TimestampPresenterComponent, BlogPostContentPresenterComponent,
                  BlogMediaPresenterComponent],
  bootstrap:    [ AppComponent ],
  providers:    httpInterceptorProviders
})
export class AppModule { }

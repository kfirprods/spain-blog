import { MainViewComponent } from './main-view-component/main-view-component';
import { AppRoutingModule } from "./app-routing.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatVideoModule } from "mat-video";
import { NgxYoutubePlayerModule } from "ngx-youtube-player";
import { AngularSvgIconModule } from "angular-svg-icon";
import { GalleryModule } from "@ks89/angular-modal-gallery";
import { CookieService } from "ngx-cookie-service";
import { MatSnackBarModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { ProgressBarDotsComponent } from "./components/progress-bar-dots/progress-bar-dots.component";
import { DaysProgressionComponent } from "./components/days-progression/days-progression.component";

import { httpInterceptorProviders } from "./http-interceptors";
import { CurrentActivityComponent } from "./components/current-activity/current-activity.component";
import { BlogPostsComponent } from "./components/blog-posts/blog-posts.component";
import { TimestampPresenterComponent } from "./components/timestamp-presenter/timestamp-presenter.component";
import { BlogPostContentPresenterComponent } from "./components/blog-post-content-presenter/blog-post-content-presenter.component";
import { BlogMediaPresenterComponent } from "./components/blog-media-presenter/blog-media-presenter.component";


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBZeQwyOfiAQuVKLNWlZIl3mHCThnAW7o",
  authDomain: "spain-blog.firebaseapp.com",
  databaseURL: "https://spain-blog.firebaseio.com",
  projectId: "spain-blog",
  storageBucket: "spain-blog.appspot.com",
  messagingSenderId: "818568752498",
  appId: "1:818568752498:web:52e1890bf35c072afec1eb",
  measurementId: "G-M37L6L4QNX"
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularSvgIconModule,
    BrowserAnimationsModule,
    MatVideoModule,
    NgxYoutubePlayerModule.forRoot(),
    GalleryModule.forRoot(),
    MatSnackBarModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFireAuthModule
  ],
  declarations: [
    AppComponent,
    ProgressBarDotsComponent,
    DaysProgressionComponent,
    CurrentActivityComponent,
    BlogPostsComponent,
    TimestampPresenterComponent,
    BlogPostContentPresenterComponent,
    BlogMediaPresenterComponent,
    MainViewComponent
  ],
  bootstrap: [AppComponent],
  providers: [httpInterceptorProviders, CookieService]
})
export class AppModule {}

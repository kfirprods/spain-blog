import { BlogPostsService } from './services/blog-posts.service';
import { TripDataService } from './services/trip-data.service';
import { CookieService } from 'ngx-cookie-service';
import { BlogPost } from './models/blog-post.type';
import { Component, Injectable, ViewEncapsulation, OnInit } from '@angular/core';

import { TripData } from './models/trip-data';
import { ActivityType } from './components/current-activity/activity-type.enum';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
@Injectable()
export class AppComponent implements OnInit {
  name = 'Angular';

  tripData: TripData;
  currentActivity: ActivityType;
  blogPosts: Array<BlogPost>;
  currentDay: number;
  absoluteCurrentDay: number;
  isLoadingData: boolean;

  lastVisit: Date;
  unreadBlogPosts: Array<BlogPost>;

  constructor(private tripDataService: TripDataService, private blogPostsService: BlogPostsService,
              private cookieService: CookieService, private snackbar: MatSnackBar) {
    this.tripData = null;

    this.isLoadingData = true;

    if (this.cookieService.check('last-visit')) {
      this.lastVisit = new Date(+this.cookieService.get('last-visit'));
    } else {
      this.lastVisit = new Date(Date.now());
    }
  }

  ngOnInit() {
    this.blogPostsService.getBlogPosts().subscribe(posts => {
      this.blogPosts = posts.sort((post1, post2) => {
        if (post1.timestamp.seconds < post2.timestamp.seconds) {
          return -1;
        } else {
          return 1;
        }
      });
      console.log(this.blogPosts);
      const unreadBlogPosts = posts.filter(b => b.timestamp.toDate().getTime() > this.lastVisit.getTime());

      if (unreadBlogPosts.length > 0) {
        this.snackbar.open(`נוספו ${unreadBlogPosts.length} פוסטים חדשים מאז הביקור האחרון שלך בימים: ` +
                      `${unreadBlogPosts.map(b => b.day).sort().filter((item, pos, ary) =>
                        !pos || item !== ary[pos - 1]).join(', ')}`, null,
                        { duration: 7500, direction: 'rtl' });
      }
    });

    this.tripDataService.getTripData().subscribe(data => {
      this.cookieService.set('last-visit', `${Date.now()}`);

      this.isLoadingData = false;
      this.tripData = data;

      const totalTripDays = Math.floor(
        (this.tripData.tripDuration.tripEnd.toDate().getTime() -
        this.tripData.tripDuration.tripStart.toDate().getTime()) / (1000 * 60 * 60 * 24)
      );

      this.currentDay = Math.floor(
        ((new Date()).getTime() - this.tripData.tripDuration.tripStart.toDate().getTime()) / (1000 * 60 * 60 * 24)
      );

      if (new Date().getTime() > this.tripData.tripDuration.tripEnd.toDate().getTime()) {
        this.currentDay = totalTripDays;
      }
      this.absoluteCurrentDay = this.currentDay;
      switch (this.tripData.currentActivity) {
        case 'walking': {
          this.currentActivity = ActivityType.Walking;
          break;
        }
        case 'sleeping': {
          this.currentActivity = ActivityType.Sleeping;
          break;
        }
        case 'dining': {
          this.currentActivity = ActivityType.Dining;
          break;
        }
        case 'flight': {
          this.currentActivity = ActivityType.Flight;
          break;
        }
        case 'publictransportation': {
          this.currentActivity = ActivityType.PublicTransportation;
          break;
        }
        case 'nightlife': {
          this.currentActivity = ActivityType.Nightlife;
          break;
        }
        case 'shopping': {
          this.currentActivity = ActivityType.Shopping;
          break;
        }
        case 'touring': {
          this.currentActivity = ActivityType.Touring;
          break;
        }
        case 'tripover': {
          this.currentActivity = ActivityType.TripOver;
          break;
        }
      }
    });
  }

  changeCurrentDay(selectedDay: number) {
    this.currentDay = selectedDay;
  }
}

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { BlogPost } from './data-models/blog-post.type';
import { Component, Injectable, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TripData } from './data-models/trip-data';
import { ActivityType } from './current-activity/activity-type.enum';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
  encapsulation: ViewEncapsulation.None
})
@Injectable()
export class AppComponent  {
  name = 'Angular';

  tripData: TripData;
  currentActivity: ActivityType;
  blogPosts: Array<BlogPost>;
  currentDay: number;
  absoluteCurrentDay: number;
  isLoadingData: boolean;

  lastVisit: Date;
  unreadBlogPosts: Array<BlogPost>;

  constructor(private db: AngularFirestore, private cookieService: CookieService, private snackbar: MatSnackBar) {
    this.tripData = null;

    this.isLoadingData = true;

    if (this.cookieService.check('last-visit')) {
      this.lastVisit = new Date(+this.cookieService.get('last-visit'));
    } else {
      this.lastVisit = new Date(Date.now());
    }

    db.collection<BlogPost>('/posts').valueChanges().subscribe(posts => {
      this.blogPosts = posts;
      console.log(this.blogPosts);
      const unreadBlogPosts = posts.filter(b => b.timestamp.toDate().getTime() > this.lastVisit.getTime());

      if (unreadBlogPosts.length > 0) {
        snackbar.open(`נוספו ${unreadBlogPosts.length} פוסטים חדשים מאז הביקור האחרון שלך בימים: ` +
                      `${unreadBlogPosts.map(b => b.day).sort().filter((item, pos, ary) =>
                        !pos || item !== ary[pos - 1]).join(', ')}`, null,
                        { duration: 7500, direction: 'rtl' });
      }
    });

    db.collection('metadata').doc<TripData>('main').valueChanges().subscribe(data => {
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
      this.absoluteCurrentDay = this.currentDay;

      if (new Date().getTime() > this.tripData.tripDuration.tripEnd.toDate().getTime()) {
        this.currentDay = totalTripDays;
      }

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

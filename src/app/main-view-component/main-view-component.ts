import { BlogPostsService } from './../services/blog-posts.service';
import { TripDataService } from './../services/trip-data.service';
import { CookieService } from 'ngx-cookie-service';
import { BlogPost } from '../models/blog-post.type';
import { Component, OnInit } from '@angular/core';

import { TripData } from '../models/trip-data';
import { ActivityType } from '../components/current-activity/activity-type.enum';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-main-view-component',
  templateUrl: './main-view-component.html',
  styleUrls: ['./main-view-component.scss']
})
export class MainViewComponent implements OnInit {
  name = 'Angular';

  tripData: TripData;
  currentActivity: ActivityType;
  blogPosts: Array<BlogPost>;
  currentDay$: Observable<number>;
  absoluteCurrentDay: number;
  isLoadingData: boolean;

  lastVisit: Date;
  unreadBlogPosts: Array<BlogPost>;

  private totalTripDays: number;

  constructor(private tripDataService: TripDataService, private blogPostsService: BlogPostsService,
              private activatedRoute: ActivatedRoute, private router: Router,
              private cookieService: CookieService, private snackbar: MatSnackBar) {
    this.tripData = null;

    this.isLoadingData = true;

    if (this.cookieService.check('last-visit')) {
      this.lastVisit = new Date(+this.cookieService.get('last-visit'));
    } else {
      this.lastVisit = new Date(Date.now());
    }
  }

  changeCurrentDay(selectedDay: number) {
    this.router.navigate([`/days/${selectedDay}`]);
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

      this.totalTripDays = Math.floor(
        (this.tripData.tripDuration.tripEnd.toDate().getTime() -
        this.tripData.tripDuration.tripStart.toDate().getTime()) / (1000 * 60 * 60 * 24)
      );

      let currentDay = Math.floor(
        ((new Date()).getTime() - this.tripData.tripDuration.tripStart.toDate().getTime()) / (1000 * 60 * 60 * 24)
      );

      if (new Date().getTime() > this.tripData.tripDuration.tripEnd.toDate().getTime()) {
        currentDay = this.totalTripDays;
      }

      this.absoluteCurrentDay = currentDay;

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

    this.currentDay$ = this.activatedRoute.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has('day')) {
          let day = +params.get('day');
          if (day < 1) {
            day = 1;
          } else if (day > this.totalTripDays) {
            day = this.totalTripDays;
          }
          return of(day);
        } else {
          return of(this.absoluteCurrentDay);
        }
      })
    );
  }
}

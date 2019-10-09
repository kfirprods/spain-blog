import { CookieService } from 'ngx-cookie-service';
import { BlogPost } from '../data-models/blog-post.type';
import { Component, Injectable, ViewEncapsulation, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TripData } from '../data-models/trip-data';
import { ActivityType } from '../current-activity/activity-type.enum';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

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
  currentDay: number;
  absoluteCurrentDay: number;
  isLoadingData: boolean;

  lastVisit: Date;
  unreadBlogPosts: Array<BlogPost>;

  constructor(private http: HttpClient, private cookieService: CookieService, private snackbar: MatSnackBar,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.tripData = null;

    this.isLoadingData = true;
  }

  changeCurrentDay(selectedDay: number) {
    this.router.navigate([`/days/${selectedDay}`]);
  }

  ngOnInit() {
    this.http.get('https://kfir.dev:3000/spain/tripdata').subscribe((data: TripData) => {
      if (this.cookieService.check('last-visit')) {
        this.lastVisit = new Date(+this.cookieService.get('last-visit'));
      } else {
        this.lastVisit = new Date(Date.now());
      }

      this.cookieService.set('last-visit', `${Date.now()}`);

      this.isLoadingData = false;
      this.tripData = data;

      const totalTripDays = Math.floor(
        (this.tripData.tripDuration.tripEnd.getTime() - this.tripData.tripDuration.tripStart.getTime()) / (1000 * 60 * 60 * 24)
      );

      this.absoluteCurrentDay = Math.ceil(
        ((new Date()).getTime() - this.tripData.tripDuration.tripStart.getTime()) / (1000 * 60 * 60 * 24));

      if (this.activatedRoute.snapshot.paramMap.has('day')) {
        this.currentDay = +this.activatedRoute.snapshot.paramMap.get('day');
      } else {
        this.currentDay = this.absoluteCurrentDay;
      }

      if (this.currentDay > totalTripDays) {
        this.currentDay = totalTripDays;
        this.absoluteCurrentDay = totalTripDays;
      }

      this.blogPosts = data.blogPosts;
      const unreadBlogPosts = this.blogPosts.filter(b => b.timestamp.getTime() > this.lastVisit.getTime());

      if (unreadBlogPosts.length > 0) {
        this.snackbar.open(`נוספו ${unreadBlogPosts.length} פוסטים חדשים מאז הביקור האחרון שלך בימים: ` +
                      `${unreadBlogPosts.map(b => b.day).sort().filter((item, pos, ary) =>
                        !pos || item !== ary[pos - 1]).join(', ')}`, null,
                        { duration: 7500, direction: 'rtl' });
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
      }
    });

    this.activatedRoute.params.subscribe(params => {
      this.currentDay = params.day;
      console.log('Day changed');
    });
  }
}

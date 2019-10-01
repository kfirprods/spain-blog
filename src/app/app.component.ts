import { BlogPost } from './data-models/blog-post.type';
import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TripData } from './data-models/trip-data';
import { ActivityType } from './current-activity/activity-type.enum';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
@Injectable()
export class AppComponent  {
  name = 'Angular';

  tripData: TripData;
  currentActivity: ActivityType;
  blogPosts: Array<BlogPost>;
  currentDay: number;
  absoluteCurrentDay: number;

  constructor(private http: HttpClient) {
    this.tripData = null;

    this.http.get('https://kfir.dev:3000/spain/tripdata').subscribe((data: TripData) => {
      this.tripData = data;

      const totalTripDays = Math.ceil(
        (this.tripData.tripDuration.tripEnd.getTime() - this.tripData.tripDuration.tripStart.getTime()) / (1000 * 60 * 60 * 24)
      );

      this.currentDay = Math.ceil(
        ((new Date()).getTime() - this.tripData.tripDuration.tripStart.getTime()) / (1000 * 60 * 60 * 24)
      );
      this.absoluteCurrentDay = this.currentDay;

      if (this.currentDay > totalTripDays) {
        this.currentDay = totalTripDays;
      }

      this.blogPosts = data.blogPosts;

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
      }
    });
  }

  changeCurrentDay(selectedDay: number) {
    this.currentDay = selectedDay;
  }
}

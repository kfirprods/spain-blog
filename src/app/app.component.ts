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
  todaysBlogPosts: Array<BlogPost>;
  currentDay: number;

  constructor(private http: HttpClient) {
    this.tripData = null;

    this.http.get('https://kfir.dev/spain/tripdata.json').subscribe((data: TripData) => {
      this.tripData = data;
      this.currentDay = 6;
      this.todaysBlogPosts = data.blogPosts.filter(b => b.day === this.currentDay);

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
}

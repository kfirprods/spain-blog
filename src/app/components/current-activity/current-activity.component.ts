import { Component, OnInit, Input } from '@angular/core';
import { ActivityType } from './activity-type.enum';

@Component({
  selector: 'app-current-activity',
  templateUrl: './current-activity.component.html',
  styleUrls: ['./current-activity.component.scss']
})
export class CurrentActivityComponent implements OnInit {

  currentActivityIconPath: string;
  currentActivityTitle: string;

  @Input()
  activityType: ActivityType;

  constructor() { }

  ngOnInit() {
    switch (this.activityType) {
      case ActivityType.Dining: {
        this.currentActivityIconPath = 'https://kfir.dev/spainmedia/icons/dine.svg';
        this.currentActivityTitle = 'אוכל';
        break;
      }

      case ActivityType.Walking: {
        this.currentActivityIconPath = 'https://kfir.dev/spainmedia/icons/walk.svg';
        this.currentActivityTitle = 'מטייל';
        break;
      }

      case ActivityType.Flight: {
        this.currentActivityIconPath = 'https://kfir.dev/spainmedia/icons/airplane-takeoff.svg';
        this.currentActivityTitle = 'בטיסה';
        break;
      }

      case ActivityType.PublicTransportation: {
        this.currentActivityIconPath = 'https://kfir.dev/spainmedia/icons/bus.svg';
        this.currentActivityTitle = 'תחבורה ציבורית';
        break;
      }

      case ActivityType.Sleeping: {
        this.currentActivityIconPath = 'https://kfir.dev/spainmedia/icons/sleep.svg';
        this.currentActivityTitle = 'ישן';
        break;
      }

      case ActivityType.Nightlife: {
        this.currentActivityIconPath = 'https://kfir.dev/spainmedia/icons/nightlife.svg';
        this.currentActivityTitle = 'חיי לילה';
        break;
      }

      case ActivityType.Shopping: {
        this.currentActivityIconPath = 'https://kfir.dev/spainmedia/icons/shopping.svg';
        this.currentActivityTitle = 'שופינג של קמצנים';
        break;
      }

      case ActivityType.Touring: {
        this.currentActivityIconPath = 'https://kfir.dev/spainmedia/icons/touring.svg';
        this.currentActivityTitle = 'תיירות קלאסית';
        break;
      }

      case ActivityType.TripOver: {
        this.currentActivityIconPath = 'https://kfir.dev/spainmedia/icons/check.svg';
        this.currentActivityTitle = 'הטיול נגמר';
        break;
      }
    }
  }
}

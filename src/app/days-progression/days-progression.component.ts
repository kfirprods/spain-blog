import { Component, OnInit, Input} from '@angular/core';
import { TripDuration } from '../data-models/trip-duration';

@Component({
  selector: 'app-days-progression',
  templateUrl: './days-progression.component.html',
  styleUrls: ['./days-progression.component.css']
})
export class DaysProgressionComponent implements OnInit {

  @Input() data: TripDuration;

  totalDayCount: number;
  currentDay: number;

  constructor() { }

  ngOnInit() {
    this.totalDayCount = this.getDayDiff(this.data.tripEnd, this.data.tripStart);
    const currentDate = new Date();
    this.currentDay = this.getDayDiff(currentDate, this.data.tripStart);
  }

  getDayDiff(date1: Date, date2: Date) {
    const diffTime = date1.getTime() - date2.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

}

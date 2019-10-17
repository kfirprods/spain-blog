import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TripDuration } from '../../models/trip-duration';

@Component({
  selector: 'app-days-progression',
  templateUrl: './days-progression.component.html',
  styleUrls: ['./days-progression.component.scss']
})
export class DaysProgressionComponent implements OnInit {

  @Input() data: TripDuration;
  @Input() currentDay: number;
  @Input() absoluteCurrentDay: number;

  @Output() dotClicked = new EventEmitter<number>();

  totalDayCount: number;

  constructor() { }

  ngOnInit() {
    this.totalDayCount = this.getDayDiff(this.data.tripEnd.toDate(), this.data.tripStart.toDate());
  }

  getDayDiff(date1: Date, date2: Date) {
    const diffTime = date1.getTime() - date2.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  onDotClicked(dayNumber: number) {
    if (dayNumber > this.absoluteCurrentDay) {
      return;
    }

    this.dotClicked.emit(dayNumber);
  }
}

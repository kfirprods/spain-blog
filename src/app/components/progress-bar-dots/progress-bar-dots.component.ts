import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-progress-bar-dots',
  templateUrl: './progress-bar-dots.component.html',
  styleUrls: ['./progress-bar-dots.component.scss']
})
export class ProgressBarDotsComponent implements OnInit {
  @Input() currentProgress: number;
  @Input() selectedProgress: number;

  @Input() total: number;

  @Output() dotClicked = new EventEmitter<number>();

  progressDots: Array<number>;

  constructor() {
  }

  ngOnInit() {
    if (this.currentProgress > this.total) {
      this.currentProgress = this.total;
    }

    this.progressDots = Array(Number(this.total) - 1).fill(0).map((x, i) => i + 1);
    this.selectedProgress = this.currentProgress;
  }

  handleDotClick(dotNumber: number) {
    this.dotClicked.emit(dotNumber);
  }
}

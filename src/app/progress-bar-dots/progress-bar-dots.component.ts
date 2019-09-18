import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-progress-bar-dots',
  templateUrl: './progress-bar-dots.component.html',
  styleUrls: ['./progress-bar-dots.component.scss']
})
export class ProgressBarDotsComponent implements OnInit {
  @Input() currentProgress: number;

  @Input() total: number;

  futureProgressDots;
  pastProgressDots;

  constructor() {
  }

  ngOnInit() {
    this.pastProgressDots = Array(Number(this.currentProgress) - 1).fill(0).map((x, i) => i + 1);
    this.futureProgressDots = Array(Number(this.total - this.currentProgress)).fill(0).map((x, i) => i + 1 + Number(this.currentProgress));
  }


}

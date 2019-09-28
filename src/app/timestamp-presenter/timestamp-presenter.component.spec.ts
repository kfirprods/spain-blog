import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimestampPresenterComponent } from './timestamp-presenter.component';

describe('TimestampPresenterComponent', () => {
  let component: TimestampPresenterComponent;
  let fixture: ComponentFixture<TimestampPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimestampPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimestampPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

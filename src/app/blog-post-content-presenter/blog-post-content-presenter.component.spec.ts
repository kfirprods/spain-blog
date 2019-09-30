import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostContentPresenterComponent } from './blog-post-content-presenter.component';

describe('BlogPostContentPresenterComponent', () => {
  let component: BlogPostContentPresenterComponent;
  let fixture: ComponentFixture<BlogPostContentPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostContentPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostContentPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

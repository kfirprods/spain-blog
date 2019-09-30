import { BlogPostContent } from './../data-models/blog-post-content.type';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-post-content-presenter',
  templateUrl: './blog-post-content-presenter.component.html',
  styleUrls: ['./blog-post-content-presenter.component.scss']
})
export class BlogPostContentPresenterComponent implements OnInit {
  @Input()
  content: BlogPostContent;

  constructor() { }

  ngOnInit() {
  }

}

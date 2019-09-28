import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../data-models/blog-post.type';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {
  @Input()
  posts: Array<BlogPost>;

  constructor() { }

  ngOnInit() {
  }

}

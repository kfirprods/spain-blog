import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { BlogPost } from '../../models/blog-post.type';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit, OnChanges {
  @Input() posts: Array<BlogPost>;
  @Input() currentDay: number;

  postsEmpty: boolean;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    const currentDay: SimpleChange = changes.currentDay;
    this.postsEmpty = this.posts.filter(post => post.day === currentDay.currentValue).length === 0;
  }

}

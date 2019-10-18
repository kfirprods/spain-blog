import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../../models/blog-post.type';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {
  @Input() posts: Array<BlogPost>;
  @Input() currentDay: Observable<number>;

  postsEmpty: boolean;

  constructor() { }

  ngOnInit() {
    this.currentDay.subscribe(newSelection => {
      this.postsEmpty = this.posts.filter(post => post.day === newSelection).length === 0;
    });
  }


}

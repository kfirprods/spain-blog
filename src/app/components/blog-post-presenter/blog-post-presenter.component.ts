import { BlogPostsService } from './../../services/blog-posts.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from 'src/app/models/blog-post.type';

import { faPen, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blog-post-presenter',
  templateUrl: './blog-post-presenter.component.html',
  styleUrls: ['./blog-post-presenter.component.scss']
})
export class BlogPostPresenterComponent implements OnInit {
  @Input() post: BlogPost;

  /* icons for editing */
  faPen = faPen;
  faCheck = faCheck;
  faTimes = faTimes;
  /*                   */

  /* title editing */
  newTitle: string;
  isEditingTitle: boolean;
  /*               */

  constructor(public auth: AuthenticationService, private blogPostsService: BlogPostsService) { }

  ngOnInit() {
  }

  editTitle() {
    this.newTitle = this.post.title;

    this.isEditingTitle = true;
  }

  applyTitleEdit() {
    this.post.title = this.newTitle;
    this.blogPostsService.updateBlogPost(this.post);

    this.isEditingTitle = false;
  }

  cancelTitleEdit() {
    this.isEditingTitle = false;
  }

  changeHeaderMediaSource() {
    this.blogPostsService.updateBlogPost(this.post);
  }
}

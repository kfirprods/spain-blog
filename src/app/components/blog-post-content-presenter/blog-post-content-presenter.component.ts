import { Paragraph } from './../../models/paragraph.type';
import { BlogPost } from './../../models/blog-post.type';
import { BlogPostsService } from './../../services/blog-posts.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, Input } from '@angular/core';

import { faPen, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blog-post-content-presenter',
  templateUrl: './blog-post-content-presenter.component.html',
  styleUrls: ['./blog-post-content-presenter.component.scss']
})
export class BlogPostContentPresenterComponent implements OnInit {
  @Input() post: BlogPost;

  /* icons for editing */
  faPen = faPen;
  faCheck = faCheck;
  faTimes = faTimes;
  /*                   */

  /* content editing */
  newParagraphText: string;
  editedParagraphId: string;
  /*               */

  constructor(public auth: AuthenticationService, private blogPostsService: BlogPostsService) { }

  ngOnInit() {
  }

  editParagraphText(paragraph: Paragraph) {
    this.newParagraphText = paragraph.text;
    this.editedParagraphId = paragraph.id;
  }

  applyParagraphEdit(paragraph: Paragraph) {
    const editedParagraph = this.post.content.paragraphs.find(p => p.id === paragraph.id);
    editedParagraph.text = this.newParagraphText;

    this.blogPostsService.updateBlogPost(this.post);

    this.editedParagraphId = null;
  }

  cancelParagraphEdit() {
    this.editedParagraphId = null;
  }
}

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blog-post.type';

@Injectable({
  providedIn: 'root'
})
export class BlogPostsService {
  private blogPosts: Observable<BlogPost[]>;

  constructor(private db: AngularFirestore) {
    this.blogPosts = db.collection<BlogPost>('/posts').snapshotChanges().pipe(map(changes => {
      return changes.map(change => {
        const blogPost = change.payload.doc.data() as BlogPost;
        blogPost.id = change.payload.doc.id;

        return blogPost;
      });
    }));
  }

  getBlogPosts() {
    return this.blogPosts;
  }

  updateBlogPost(post: BlogPost) {
    this.db.doc(`posts/${post.id}`).update(post);
  }
}

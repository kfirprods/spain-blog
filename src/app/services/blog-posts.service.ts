import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { BlogPost } from '../models/blog-post.type';

@Injectable({
  providedIn: 'root'
})
export class BlogPostsService {
  private blogPosts: Observable<BlogPost[]>;

  constructor(private db: AngularFirestore) {
    this.blogPosts = db.collection<BlogPost>('/posts').valueChanges();
  }

  getBlogPosts() {
    return this.blogPosts;
  }
}

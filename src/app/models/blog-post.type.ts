import { BlogPostContent } from './blog-post-content.type';
import { BlogMedia } from './blog-media.type';
import { firestore } from 'firebase';

export interface BlogPost {
  day: number;
  title: string;
  timestamp: firestore.Timestamp;

  /* This media appears with the title */
  media: BlogMedia;

  content: BlogPostContent;

  /* This is the firestore id of the blog post */
  id: string;
}

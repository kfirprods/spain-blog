import { BlogPostContent } from './blog-post-content.type';
import { BlogMedia } from './blog-media.type';

export interface BlogPost {
  day: number;
  title: string;

  /* This media appears with the title */
  media: BlogMedia;

  content: BlogPostContent;
}

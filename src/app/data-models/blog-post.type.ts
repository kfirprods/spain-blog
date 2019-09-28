import { BlogMedia } from './blog-media.type';

export interface BlogPost {
  day: number;
  title: string;
  content: string;
  media: BlogMedia;
}

import { BlogMedia } from './blog-media.type';

export interface Paragraph {
  media: BlogMedia;
  text: string;
  direction: string;
  id: string;
}

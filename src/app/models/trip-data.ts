import { TripDuration } from './trip-duration';
import { BlogPost } from './blog-post.type';

export interface TripData {
  tripDuration: TripDuration;
  currentActivity: string;
  blogPosts: Array<BlogPost>;
}

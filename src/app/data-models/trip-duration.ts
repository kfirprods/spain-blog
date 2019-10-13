import { firestore } from 'firebase';

export interface TripDuration {
  tripStart: firestore.Timestamp;
  tripEnd: firestore.Timestamp;
}

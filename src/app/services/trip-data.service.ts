import { Observable } from 'rxjs';
import { TripData } from './../models/trip-data';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private tripData: Observable<TripData>;

  constructor(private db: AngularFirestore) {
    this.tripData = db.collection('metadata').doc<TripData>('main').valueChanges();
  }

  getTripData() {
    return this.tripData;
  }
}

import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<string>;
  isAdmin$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        // Logged in
        if (user) {
          return of(user.uid);
        } else {
          return of(null);
        }
      })
    );

    this.isAdmin$ = this.user$.pipe(
      switchMap(user => of(user === 'bTaj8WgQp3YhQfsdY3yt3l9l23f2'))
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    return credential.user.uid;
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}

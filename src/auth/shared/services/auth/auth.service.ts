import { Injectable } from '@angular/core';

// import { Store } from './src/
import { Store } from '../../../../store';

import 'rxjs/add/operator/do';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable()
export class AuthService {

  auth$ = this.af.authState
    .do(next => {
      if (!next) {
        this.store.set('user', null);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this.store.set('user', user);
    });

  constructor(
    private store: Store,
    private af: AngularFireAuth
  ) {}

  loginWithGoogle() {
    return this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logoutUser() {
    return this.af.auth.signOut();
  }

  get authState() {
    return this.af.authState;
  }
}

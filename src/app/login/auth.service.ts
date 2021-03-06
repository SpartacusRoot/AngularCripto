import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Router} from '@angular/router';



@Injectable()
export class AuthService  {



  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }

  login() {
   this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
   // script creato per la restrinzione solo a domini temera.it
  // const provider = new firebase.auth.GoogleAuthProvider();
  // provider.setCustomParameters({
  //    'hd': 'temera.it'
  //  });
  //  firebase.auth().signInWithRedirect(provider);
  }
  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }


}

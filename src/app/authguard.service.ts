import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { take, map, tap} from 'rxjs/operators';
import { AuthService } from './login/auth.service';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor(public auth: AuthService, private router: Router) { }
  canActivate() {
    return this.auth.afAuth.authState.pipe(
      take(1),
      map(authState => !!authState),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
      })
    );
    }

}

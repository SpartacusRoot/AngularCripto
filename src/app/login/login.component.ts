import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('bounceIn', [transition('* => *', useAnimation(bounceIn))])
  ]
})
export class LoginComponent implements OnInit {

  bounceIn: any;

  constructor(  private router: Router, public auth: AuthService,
                iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {

                  iconRegistry.addSvgIcon(
                    'google',
                    sanitizer.bypassSecurityTrustResourceUrl('../../assets/google.svg'));


  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }


  ngOnInit() {
  }



}

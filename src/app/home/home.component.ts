import { Component } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounceIn } from 'ng-animate';
// angular Material
import {MatToolbarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatIconModule} from '@angular/material';








@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('bounceIn', [transition('* => *', useAnimation(bounceIn))])
  ],
})
export class HomeComponent  {
  id: string;
  bounceIn: any;
  constructor() {

  }
}

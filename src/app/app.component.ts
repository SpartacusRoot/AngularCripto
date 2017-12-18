import { Router } from '@angular/router';
import { Component } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// angular Material
import {MatToolbarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogDecriptComponent } from './dialog-decript/dialog-decript.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(public router: Router, public dialog: MatDialog) {}
  goTo() {
    this.router.navigate(['/criptogramma']);
  }

openDialog() {
          const dialog = this.dialog.open( DialogDecriptComponent, {
            height: '300px',
            width: '700px',
          });

        }

}

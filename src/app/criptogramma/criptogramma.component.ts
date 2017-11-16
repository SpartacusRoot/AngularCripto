import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

// Angular Material
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
// diaLog to do
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatCardModule} from '@angular/material';
import { DialogPostComponent } from '../dialog-post/dialog-post.component';

@Component({
  selector: 'app-criptogramma',
  templateUrl: './criptogramma.component.html',
  styleUrls: ['./criptogramma.component.css']
})
export class CriptogrammaComponent implements OnInit {
  name: string;
  username: string;
  password: string;
  note: string;
  access: string;
  result: any;
  results: Object;
   hide: boolean;
    constructor(private http: HttpClient, public dialog: MatDialog) {
    }

    openDialog() {
      const dialog = this.dialog.open( DialogPostComponent, {
        height: '500px',
        width: '700px',
        data: {
          name: this.name,
          username: this.username,
          password: this.password,
          access: this.access,
          note: this.note
        }
      });

    }

    ngOnInit() {
    }

    onSubmit(value: string): void {
      console.log('you submitted value:', value);
      this.http.post('api/form', value).subscribe(res  => {
  this.result = value['results'];
  console.log(this.results);
});
}





  }




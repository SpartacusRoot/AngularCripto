import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import 'rxjs/add/operator/map';
// Angular Material
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material';
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
  hide = true;
  loading: boolean;
  result: any;
  results: Object;
  data: any;
res1: any;
resGet: any;
    constructor(private http: HttpClient, private http2: Http, public dialog: MatDialog) {
    }

    openDialog() {
      const dialog = this.dialog.open( DialogPostComponent, {
        height: '500px',
        width: '550px',
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

      this.http.get('api/search/' + this.name).subscribe(data1 => {
        this.resGet = data1;
        console.log(data1);
        });
    }

    onSubmit(value: string): void {
      console.log('you submitted value:', value);
      this.http.post('api/form', value).subscribe(res  => {
  this.result = value['results'];
  console.log(this.results);
});


    }

    getDb() {
  this.loading = true;
  this.http.get('api/users', {responseType: 'text'})
  .subscribe(res => {
    this.results = res;
    console.log(this.results);
    this.loading = false;
  });
  }




  }




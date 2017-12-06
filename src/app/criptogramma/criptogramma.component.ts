import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  Validators,
  MaxLengthValidator,
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

// Angular Material
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatCardModule} from '@angular/material';
import { DialogPostComponent } from '../dialog-post/dialog-post.component';
// shared service



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
  status: boolean;
  error: string;
   hide: boolean;
   maxlength: string;
   name_validator = new FormControl('', [Validators.required, Validators.email]);
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





    onSubmit(searchTerm: HTMLInputElement, searchTerm2: HTMLInputElement, searchTerm3: HTMLInputElement): void {

  let params = new HttpParams();
  params = params.append('nome_cliente', searchTerm.value);
  params = params.append('username', searchTerm2.value);
  params = params.append('tipo_accesso', searchTerm3.value);
  this.http.get('api/check', {params: params}).subscribe(res  => {
  this.result = res['results'];
  this.status = res['status'];
  this.error = res['error'];

  console.log(this.result, this.status, this.error);
  if (this.status === false) {
    return this.openDialog();
    } else if (this.status === true) {
    console.log('i dati non sono corretti');
    }

});

}





  }




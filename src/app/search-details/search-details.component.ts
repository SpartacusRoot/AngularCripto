import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Http } from '@angular/http';
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
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {
  Validators,
  MaxLengthValidator,
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css']
})
export class SearchDetailsComponent implements OnInit {
  hide = true;
  id: number;
  nome_cliente: string;
  name: string;
  access: string;
  username: string;
  password: string;
  tipo_accesso: string;
  note: string;
  private sub: any;
  result: any;
  results: Object;
  status: boolean;
  error: string;
  name_validator = new FormControl('', [Validators.required, Validators.email]);

  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient, public dialog: MatDialog) { }


    openDialog() {
      const dialog = this.dialog.open( DialogUpdateComponent, {
        height: '500px',
        width: '550px',
        data: {
          id: this.id,
          nome_cliente: this.nome_cliente,
          username: this.username,
          password: this.password,
          tipo_accesso: this.tipo_accesso,
          note: this.note
        }
      });

      dialog.afterClosed().subscribe(result => {

      });
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



  ngOnInit() {
/*
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.nome_cliente = params['name'];
      this.username = params['username'];
      this.password = params['password'];
      this.tipo_accesso = params['tipo_accesso'];
      this.note = params['note'];


   });
  }
*/
this.sub = this.route.queryParams.subscribe(params => {
  this.id = +params['id']; // (+) converts string 'id' to a number
  this.nome_cliente = params['name'];
  this.username = params['username'];
  this.password = params['password'];
  this.tipo_accesso = params['tipo_accesso'];
  this.note = params['note'];
});
  }
}

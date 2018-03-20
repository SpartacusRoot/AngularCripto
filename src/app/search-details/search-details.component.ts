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
// diaLog
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
// animations
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';



@Component({
  selector: 'app-search-details',
  templateUrl: './search-details.component.html',
  styleUrls: ['./search-details.component.css'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 1 }
    }))])
  ]
})
export class SearchDetailsComponent implements OnInit {
  fadeIn: any;
  hide = true;
  id: number;
  id_username: number;
  id_tipo_accesso: number;
  id_password: number;
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


  constructor(private route: ActivatedRoute,
    private router: Router, private http: HttpClient, public dialog: MatDialog) { }


    returnToTable() {
      this.router.navigate(['ricerca'], {queryParams: { nome_cliente: this.nome_cliente, tipo_accesso: this.tipo_accesso
        , password: this.password }});
    }


    openDialog() {
      const dialog = this.dialog.open( DialogUpdateComponent, {
        height: '500px',
        width: '550px',
        data: {
          id: this.id,
          id_username: this.id_username,
          id_tipo_accesso: this.id_tipo_accesso,
          id_password: this.id_password,
          nome_cliente: this.nome_cliente,
          username: this.username,
          password: this.password,
          tipo_accesso: this.tipo_accesso,
          note: this.note
        }
      });
    }






  ngOnInit() {
    console.log('parametri', this.nome_cliente);
this.sub = this.route.queryParams.subscribe(params => {
  this.id = +params['id']; // (+) converts string 'id' to a number
  this.id_username = +params['id_username'];
  this.id_tipo_accesso = +params['id_tipo_accesso'];
  this.id_password = +params['id_password'];
  this.nome_cliente = params['name'];
  this.username = params['username'];
  this.password = params['password'];
  this.tipo_accesso = params['tipo_accesso'];
  this.note = params['note'];
});
  }

}

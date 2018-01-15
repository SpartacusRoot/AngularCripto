import { Router } from '@angular/router';
import { Component, OnInit,  Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import {ObserversModule} from '@angular/cdk/observers';
@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.css']
})
export class DialogUpdateComponent implements OnInit {
  result: any;
  nome_cliente: string;
  username: string;
  password: string;
  tipo_accesso: string;
  note: string;
  name: string;
  id: number;
  access: any;
  id_username: number;
  id_tipo_accesso: number;
  id_password: number;

  constructor(public dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,
    private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  this.id = this.data.id;
  this.id_username = this.data.id_username;
  this.id_tipo_accesso = this.data.tipo_accesso;
  this.id_password = this.data.id_password;
  this.nome_cliente = this.data.nome_cliente;
  this.username = this.data.username;
  this.password = this.data.password;
  this.tipo_accesso = this.data.tipo_accesso;
  this.access = this.data.access;
  this.note = this.data.note;
  }

  onUpdate() {
    let Params = new HttpParams();
    Params = Params.append('username', this.username);
    Params = Params.append('tipo_accesso', this.tipo_accesso);
    console.log('you submitted value:', this.data);
    this.http.put('api/update', this.data, {params: Params}).subscribe(res  => {
    this.result = this.data['results'];
    console.log('you submitted value:', this.result);
    this.dialogRef.close();
    this.router.navigate(['ricerca'], {queryParams: { nome_cliente: this.data.nome_cliente, tipo_accesso: this.data.tipo_accesso
  , password: this.data.password }});

    });
  }



openSnackBar() {
  const ref = this.snackBar
  .open('I tuoi dati sono stati correttamente aggiornati', 'x', { duration: 2000 });
  console.log('you submitted value:', this.data);
}



}

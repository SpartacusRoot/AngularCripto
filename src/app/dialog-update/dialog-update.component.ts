import { Component, OnInit,  Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
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
 id: string;
 access: any;
  constructor(public dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  this.id = this.data.id;
  this.nome_cliente = this.data.nome_cliente;
  this.username = this.data.username;
  this.password = this.data.password;
  this.tipo_accesso = this.data.tipo_accesso;
  this.access = this.data.access;
  this.note = this.data.note;
  }

  onUpdate() {

    console.log('you submitted value:', this.data);
    this.http.put('api/update', this.data).subscribe(res  => {
    this.result = this.data['results'];
console.log(this.result);
this.dialogRef.close();

    });
  }



openSnackBar() {
  const ref = this.snackBar
  .open('I tuoi dati sono stati correttamente aggiornati', 'chiudi', { duration: 5000 });
  console.log('you submitted value:', this.data);
}

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { HttpClient} from '@angular/common/http';
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


    onSubmit(value: string): void {
      console.log('you submitted value:', value);
      this.http.put('api/update', value).subscribe(res  => {
      this.result = value['results'];
      console.log(this.result);

      });
    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.nome_cliente = params['name'];
      this.username = params['username'];
      this.password = params['password'];
      this.tipo_accesso = params['tipo_accesso'];
      this.note = params['note'];


   });
  }

}

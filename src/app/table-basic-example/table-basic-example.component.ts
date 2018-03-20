import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Component, OnInit, Input, AfterViewInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { ItemsResponse } from './../home/itemResponse';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
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

import { map, startWith, filter, switchMap, debounceTime } from 'rxjs/operators';
import { AutocompleteService } from '../service/autocomplete.service';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { ClipboardModule } from 'ngx-clipboard';
import {MatSnackBar} from '@angular/material';




@Component({
  selector: 'app-table-basic-example',
  templateUrl: './table-basic-example.component.html',
  styleUrls: ['./table-basic-example.component.css']

})
export class TableBasicExampleComponent implements OnInit   {

rows: any;
res: ItemsResponse[] = [];
selectedRes: ItemsResponse;
data1:  any;
row: any;
results: any;
private sub: any;
nome_cliente: string;
password: string;
tipo_accesso: string;

filteredOptions: Observable<any>;
filteredOptions1: Observable<any>;



myControl: FormControl = new FormControl();
usernameControl: FormControl = new FormControl();
tipo_accessoControl: FormControl = new FormControl();


 constructor(private http: HttpClient, private router: Router,
   private route: ActivatedRoute, public autoCompleteService: AutocompleteService,
    private snackBar: MatSnackBar) {

  this.filteredOptions1 = this.myControl.valueChanges
        .pipe(
          startWith(null),
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(val => {
            return this.filterTipoAccess(val || '');
          })
        );

}






ngOnInit() {
  this.sub = this.route.queryParams.subscribe(params => {
    this.nome_cliente = params['nome_cliente'];
    this.tipo_accesso = params['tipo_accesso'];
    this.password = params['password'];
   });
  this.updateData();

  this.filteredOptions = this.myControl.valueChanges
  .pipe(
    startWith(null),
    debounceTime(200),
    distinctUntilChanged(),
    switchMap(val => {
      return this.filterNome(val || '');
    }),
  );


}
showDetails(res: ItemsResponse) {
  this.selectedRes = res;
  const resId = res ? res.id : null;
  const resIdUsername = res ? res.id_username : null;
  const resIdAccesso = res ? res.id_tipo_accesso : null;
  const resIdPassword = res ? res.id_password : null;
  const resName = res ? res.nome_cliente : null;
  const resUsername = res ? res.username : null;
  const resPassword = res ? res.password : null;
  const resNote = res ? res.note : null;
  const resAccesso = res ? res.tipo_accesso : null;
  this.router.navigate(['edit'], { queryParams: { id: resId, id_username: resIdUsername,
     id_tipo_accesso: resIdAccesso, id_password: resIdPassword, name: resName, username: resUsername,
    password: resPassword, note: resNote, tipo_accesso: resAccesso} }   );
    }

showDetails2(res: ItemsResponse) {
  this.selectedRes = res;
  const resId = res ? res.id : null;
  const resName = res ? res.nome_cliente : null;
  const resUsername = res ? res.username : null;
  const resPassword = res ? res.password : null;
  const resNote = res ? res.note : null;
  const resAccesso = res ? res.tipo_accesso : null;

this.router.navigate(['decrypt'], { queryParams: { id: resId, name: resName, username: resUsername,
password: resPassword, note: resNote, tipo_accesso: resAccesso} }   );
}

getName  (searchTerm?: HTMLInputElement, searchTerm2?: HTMLInputElement, searchTerm3?: HTMLInputElement) {
  let params = new HttpParams();
    params.set('nome', searchTerm.value);
    params.set('tipo_accesso', searchTerm2.value);
    params = params.append('nome_cliente', searchTerm.value);
    params = params.append('tipo_accesso', searchTerm2.value);
    params = params.append('password', searchTerm3.value);
    this.http.get('api/search', {params: params}).subscribe(data1 => {
      this.rows = data1;
      console.log('result query', this.rows);

        });


}


updateData() {
  if (this.nome_cliente === undefined) {
    this.http.get('api/search?nome_cliente=&tipo_accesso=&password=').subscribe(data1 => this.rows = data1);
  } else {
  let params = new HttpParams();
  params = params.append('nome_cliente', this.nome_cliente);
 // params = params.append('tipo_accesso', this.tipo_accesso);
 // params = params.append('password', this.password);
  this.http.get('api/search', {params: params}).subscribe(data1 => {
    this.rows = data1;
    console.log(this.rows);
  });
}
}

// filter nome_cliente

filterNome(val: string): Observable<any[]> {
  return this.autoCompleteService.search_autocomplete()
  .pipe(
   map(response => response.filter(res => {
      return res.nome_cliente
      .toLowerCase().indexOf(val.toLowerCase()) === 0;
    })),
  );
}

// filter tipo_accesso


filterTipoAccess(val: string): Observable<any[]> {
return this.autoCompleteService.search_autocompleteAccess(this.myControl.value)
.pipe(
map(response => response
  .filter(res => {
  return res.tipo_accesso.toLowerCase().indexOf(val.toLowerCase()) === 0;
}))
);
}

openSnackBar() {
  const ref = this.snackBar
  .open('il tuo criptogramma è stato copiato correttamente ', 'x', { duration: 2000 });
}
}


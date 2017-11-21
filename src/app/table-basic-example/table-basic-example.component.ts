import { BehaviorSubject } from 'rxjs/Rx';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';




import {MatTableModule} from '@angular/material';
import { ItemsResponse } from './../home/itemResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import {MatIconModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';


// ngx-NgxDatatableModule
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-table-basic-example',
  templateUrl: './table-basic-example.component.html',
  styleUrls: ['./table-basic-example.component.css'],

})
export class TableBasicExampleComponent {
 rows: any;
  loadingIndicator = true;
  reorderable  = true;

  columns = [
    { prop: 'nome_cliente', name: 'nome cliente' },
    { prop: 'username' },
    { prop: 'password' },
    { prop: 'tipo_accesso' },
    { name: 'edit'}
];



selected = [];
 res: ItemsResponse[] = [];
 selectedRes: ItemsResponse;
data1$:  BehaviorSubject<any> = new BehaviorSubject({});
row: any;
results: any;



 constructor(private http: HttpClient, private router: Router, private _Activatedroute: ActivatedRoute) {
}

onSelect({selected, rowIndexes: number, row }) {
  console.log('Select Event', selected, this.selected);
     this.router.navigate(['edit/'], { queryParams: { id: this.selected[0].id, name: this.selected[0].nome_cliente,
       username: this.selected[0].username, password: this.selected[0].password, note: this.selected[0].note,
       tipo_accesso: this.selected[0].tipo_accesso} }   );
       this.rows = [...this.rows];

     // this.selected.splice(0, this.selected.length);
     // this.selected.push(...selected);
}

onActivate(event ) {
  console.log( event);

  }

  onSel({selected}) {
console.log('se', this.selected);
  }

onSelect2({selected, rowIndexes: number, row }) {
     this.router.navigate(['api/decrypt/'], { queryParams: { id: this.selected[0].id, name: this.selected[0].nome_cliente,
       username: this.selected[0].username, password: this.selected[0].password, note: this.selected[0].note,
       tipo_accesso: this.selected[0].tipo_accesso} }   );
       this.rows = [...this.rows];

     // this.selected.splice(0, this.selected.length);
     // this.selected.push(...selected);
}


/*
go({selected}) {
  this.router.navigate(['/ricerca/:id/:name/:username/:password/:note/:tipo_accesso',
  { id: this.selected, name: value.nome_cliente, username: value.username, password: value.password, note: value.note ,
     tipo_accesso: value.tipo_accesso}]);
}
*/

showDetails(res: ItemsResponse) {
  this.selectedRes = res;
  const resId = res ? res.id : null;
  const resName = res ? res.nome_cliente : null;
  const resUsername = res ? res.username : null;
  const resPassword = res ? res.password : null;
  const resNote = res ? res.note : null;
  const resAccesso = res ? res.tipo_accesso : null;
  this.router.navigate(['edit'], { queryParams: { id: resId, name: resName, username: resUsername,
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
  /*
  this.router.navigate(['decrypt',
  { id: resId, name: resName, username: resUsername, password: resPassword, note: resNote, accesso: resAccesso}]);
*/

this.router.navigate(['api/decrypt/'], { queryParams: { id: resId, name: resName, username: resUsername,
password: resPassword, note: resNote, tipo_accesso: resAccesso} }   );
}




/*
  getName(searchTerm: HTMLInputElement, searchTerm2: HTMLInputElement, searchTerm3: HTMLInputElement) {
  this.http.get<ItemsResponse>('api/search/' + searchTerm.value).subscribe(data1 => {
  this.results = data1;
   console.log(this.results);


    });
  }
*/


/* for custom table

getName = (searchTerm: HTMLInputElement, searchTerm2: HTMLInputElement, searchTerm3: HTMLInputElement) => {
let params = new HttpParams();
 // params.set('nome', searchTerm.value);
 // params.set('tipo_accesso', searchTerm2.value);
  params = params.append('nome_cliente', searchTerm.value);
  params = params.append('tipo_accesso', searchTerm2.value);
  params = params.append('password', searchTerm3.value);
  this.http.get<ItemsResponse>('api/search', {params: params}).subscribe(data1 => {
    this.results = data1;
    console.log(this.results);
      });

*/

// test ngx-datatable

getName = (searchTerm: HTMLInputElement, searchTerm2: HTMLInputElement, searchTerm3: HTMLInputElement) => {
  let params = new HttpParams();
   // params.set('nome', searchTerm.value);
   // params.set('tipo_accesso', searchTerm2.value);
    params = params.append('nome_cliente', searchTerm.value);
    params = params.append('tipo_accesso', searchTerm2.value);
    params = params.append('password', searchTerm3.value);
    this.http.get('api/search', {params: params}).subscribe(data1 => {
      this.rows = data1;
      console.log(this.rows);

        });


  /* return IntervalObservable
  .create(5000)
  .flatMap((i)  =>
  this.http.get<ItemsResponse>('api/search', {params: params} )).subscribe(data1 => {
this.results = data1;
console.log(this.results);
  });

*/
} }

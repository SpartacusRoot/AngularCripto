import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/mergeMap';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';




import {MatTableModule} from '@angular/material';
import { ItemsResponse } from './../home/itemResponse';
import { HttpClient, HttpParams } from '@angular/common/http';
import {MatIconModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';




@Component({
  selector: 'app-table-basic-example',
  templateUrl: './table-basic-example.component.html',
  styleUrls: ['./table-basic-example.component.css'],

})
export class TableBasicExampleComponent implements OnInit {
  @Input() rows: any;


  columns = [
    { prop: 'nome_cliente', name: 'nome cliente' },
    { prop: 'username' },
    { prop: 'password' },
    { prop: 'tipo_accesso' },
    { name: 'edit'}
];




 res: ItemsResponse[] = [];
 selectedRes: ItemsResponse;
data1$:  BehaviorSubject<any> = new BehaviorSubject({});
row: any;
results: any;
private sub: any;
nome_cliente: string;
password: string;
tipo_accesso: string;


 constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {

}


ngOnInit() {
  this.sub = this.route.queryParams.subscribe(params => {
    this.nome_cliente = params['nome_cliente'];
    this.tipo_accesso = params['tipo_accesso'];
    this.password = params['password'];
   });
  this.updateData();
}
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

this.router.navigate(['api/decrypt/'], { queryParams: { id: resId, name: resName, username: resUsername,
password: resPassword, note: resNote, tipo_accesso: resAccesso} }   );
}

getName  (searchTerm: HTMLInputElement, searchTerm2: HTMLInputElement, searchTerm3: HTMLInputElement) {
  let params = new HttpParams();
   // params.set('nome', searchTerm.value);
   // params.set('tipo_accesso', searchTerm2.value);
    params = params.append('nome_cliente', searchTerm.value);
  //  params = params.append('tipo_accesso', searchTerm2.value);
  //  params = params.append('password', searchTerm3.value);
    this.http.get('api/search', {params: params}).subscribe(data1$ => {
      this.rows = data1$;
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
}


updateData() {
  let params = new HttpParams();
  params = params.append('nome_cliente', this.nome_cliente);
 // params = params.append('tipo_accesso', this.tipo_accesso);
 // params = params.append('password', this.password);
  this.http.get('api/search', {params: params}).subscribe(data1$ => {
    this.rows = data1$;
    console.log(this.rows);
  });
}
}

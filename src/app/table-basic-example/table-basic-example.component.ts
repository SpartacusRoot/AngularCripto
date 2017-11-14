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
import { HttpClient } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {MatIconModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-table-basic-example',
  templateUrl: './table-basic-example.component.html',
  styleUrls: ['./table-basic-example.component.css'],

})
export class TableBasicExampleComponent {


  displayedColumns = ['position', 'name', 'weight', 'symbol', 'tipo accesso', 'operations'];
  dataSource = new ExampleDataSource();


 res: ItemsResponse[] = [];
 selectedRes: ItemsResponse;
data1$:  BehaviorSubject<any> = new BehaviorSubject({});

results: any;



 constructor(private http: HttpClient, private router: Router, private _Activatedroute: ActivatedRoute) {

}




showDetails(res: ItemsResponse) {
  this.selectedRes = res;
  const resId = res ? res.id : null;
  const resName = res ? res.nome_cliente : null;
  const resUsername = res ? res.username : null;
  const resPassword = res ? res.password : null;
  const resNote = res ? res.note : null;
  const resAccesso = res ? res.tipo_accesso : null;
  this.router.navigate(['/ricerca/:id/:name/:username/:password/:note/:tipo_accesso',
  { id: resId, name: resName, username: resUsername, password: resPassword, note: resNote, tipo_accesso: resAccesso}]);
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

getName = (searchTerm: HTMLInputElement) => {
  this.http.get<ItemsResponse>('api/search/' + searchTerm.value).subscribe(data1 => {
    this.results = data1;
    console.log(this.results);
      });

  return IntervalObservable
  .create(5000)
  .flatMap((i)  =>
  this.http.get<ItemsResponse>('api/search/' + searchTerm.value)).subscribe(data1 => {
this.results = data1;
console.log(this.results);
  });


}



}

export interface Element {
  data1?: string[];
  username: string;
  nome_cliente: string;
  password: string;
  note: string;
  operations: any;
}


const data: Element[] = [
  {nome_cliente: 'df', username: 'Hydrogen', password: '1.0079', note: 'H', operations: ' '}

];



/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */


export class ExampleDataSource extends DataSource<any> {
  results = data;
  /** Connect function called by the table to retrieve one stream containing the data to render. */

  connect(): Observable<Element[]> {
    return Observable.of(data);

  }

  disconnect() {}


}

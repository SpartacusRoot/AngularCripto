import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AbstractControl } from '@angular/forms/src/model';


@Injectable()
export class AutocompleteService {
api: string;
  constructor(public http: HttpClient) {
    this.api = 'api/autocomplete';
  }

search_autocomplete(): Observable<any[]> {

 // let Params = new HttpParams();
 // Params = Params.append('nome_cliente', term.value);
return this.http.get<any>(this.api);
}

search_autocompleteAccess(value: AbstractControl) {

  // let Params = new HttpParams();
  // Params = Params.append('nome_cliente', term.value);
 return this.http.get<any>('api/autocompleteAccesso' + '?nome_cliente=' + value);
 }
}

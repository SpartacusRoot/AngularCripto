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

// autocomplete http nome_cliente
search_autocomplete(): Observable<any[]> {
return this.http.get<any>(this.api);
}
// autocomplete http tipo_accesso
search_autocompleteAccess(value: any) {
 return this.http.get<any>('api/autocompleteAccesso' + '?nome_cliente=' + value);
 }

}



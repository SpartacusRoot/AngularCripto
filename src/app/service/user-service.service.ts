import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ItemsResponse } from '../home/itemResponse';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserServiceService {

  constructor(private http: HttpClient) { }


getUser(nome_cliente: string): Observable<ItemsResponse> {
  let params = new HttpParams();
  params = params.append('nome_cliente', nome_cliente);
  return this.http.get<ItemsResponse>('api/search', {params: params});
}

}

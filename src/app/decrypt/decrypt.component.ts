import { ItemsResponse } from './../home/itemResponse';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-decrypt',
  templateUrl: './decrypt.component.html',
  styleUrls: ['./decrypt.component.css']
})
export class DecryptComponent implements OnInit {
  hide = true;
  id: number;
  nome_cliente: string;
  username: string;
  password: string;
  tipo_accesso: string;
  note: string;
  private sub: any;
  result: any;
  results: Object;


  constructor(private http: HttpClient, private route: ActivatedRoute,
    private router: Router) { }
  results1: any;
  res: any;




  ngOnInit() {





        this.sub = this.route.queryParams.subscribe(params => {
          this.id = +params['id']; // (+) converts string 'id' to a number
          this.nome_cliente = params['name'];
          this.username = params['username'];
          this.password = params['password'];
          this.tipo_accesso = params['tipo_accesso'];
          this.note = params['note'];

       });


       this.http.post('api/decrypt/', {
        password: this.password
      }).subscribe(data2 => {
        this.res = data2['password'];
            console.log('ecco ' + this.res);

          });



  }

}

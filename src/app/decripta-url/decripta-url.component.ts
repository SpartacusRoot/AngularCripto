import { HttpParams, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-decripta-url',
  templateUrl: './decripta-url.component.html',
  styleUrls: ['./decripta-url.component.scss']
})
export class DecriptaUrlComponent implements OnInit {
  password: string;
  private sub: any;
  rows: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {

    this.sub = this.route.queryParams.subscribe(params => {
     this.password = params['password'];
    });

this.getData();
}

getData() {
  let params = new HttpParams();
  params = params.append('password', this.password);
  this.http.get('api/decrypta', {params: params}).subscribe(data1 => {
    this.rows = data1;
    console.log(this.rows);
  });
}

}

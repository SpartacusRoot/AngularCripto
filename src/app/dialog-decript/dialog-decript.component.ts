import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormControl, AbstractControl, FormBuilder,
  FormGroup,
  Validators,
 } from '@angular/forms';
import { ItemsResponse } from '../home/itemResponse';
import { map, filter, debounceTime} from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';




@Component({
  selector: 'app-dialog-decript',
  templateUrl: './dialog-decript.component.html',
  styleUrls: ['./dialog-decript.component.scss']
})
export class DialogDecriptComponent implements OnInit {
myForm: FormGroup;
criptogramma: string;
res: Object;
password: string;
id: string;
  constructor(private http: HttpClient, private fb: FormBuilder) { }



   asyncValidator(control: AbstractControl): {[key: string]: any} {

  return this.http.get<ItemsResponse>('api/checkPassword' + '?password=' +  control.value).pipe(
    map((res: any) => res.filter(res1 => res1.password ===  control.value))
   ).map(res => {
console.log(res);
if (res.length !== 0) {
 return res ? null : { passwordExist: false };
} else {
  return { passwordExist: true };
}
   });



//  .subscribe(res => {
//
// console.log(res);
//  });

}




  ngOnInit() {

    this.myForm = this.fb.group({
password: ['',
Validators.required, this.asyncValidator.bind(this)
]

    });


  }



}


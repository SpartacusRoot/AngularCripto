import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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

// Angular Material
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatCardModule} from '@angular/material';
import { DialogPostComponent } from '../dialog-post/dialog-post.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// animations
import { trigger, transition, useAnimation } from '@angular/animations';
import {fadeIn } from 'ng-animate';
import { Observable } from 'rxjs/Observable';
import { map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-criptogramma',
  templateUrl: './criptogramma.component.html',
  styleUrls: ['./criptogramma.component.css'],
  animations: [
    trigger('fadeIn', [transition('* => *', useAnimation(fadeIn, {
      params: { timing: 1 }
    }))])
  ]
})
export class CriptogrammaComponent implements OnInit, AfterViewInit {

  fadeIn: any;
  name: string;
  username: string;
  password: string;
  note: string;
  access: string;
  result: string;
  results: Object;
  status: boolean;
  error: string;
  hide: boolean;
  maxlength: string;

  // name_validator = new FormControl('',  [Validators.required, Validators.email]);
  name_validators = new FormControl('', {
    validators: Validators.required,
    updateOn: 'blur'
  });

  options = [
    'One',
    'Two',
    'Three'
  ];

  filteredOptions: Observable<string[]>;

    constructor(private http: HttpClient, public dialog: MatDialog, private cd: ChangeDetectorRef) {
    }

    openDialog() {

      const dialog = this.dialog.open( DialogPostComponent, {
        height: '700px',
        width: '1000px',
        data: {
          name: this.name,
          username: this.username,
          password: this.password,
          access: this.access,
          note: this.note
        }
      });

    }

ngAfterViewInit() {
  this.cd.detectChanges();
}

    ngOnInit() {
      this.filteredOptions = this.name_validators.valueChanges
        .pipe(
          startWith(null),
          map(val =>
            this.filter(val))
        );

    }


    filter(val: string): string[] {
      return this.options.filter(option =>
        option.indexOf(val) === 0);
    }

    onSubmit(searchTerm: HTMLInputElement, searchTerm2: HTMLInputElement, searchTerm3: HTMLInputElement): void {

  let params = new HttpParams();
  params = params.append('nome_cliente', searchTerm.value);
  params = params.append('username', searchTerm2.value);
  params = params.append('tipo_accesso', searchTerm3.value);
  this.http.get('api/check', {params: params}).subscribe(res  => {
  this.result = res['results'];
  this.status = res['status'];
  this.error = res['error'];

  console.log(this.result, this.status, this.error);
  if (this.status === false) {
    return this.openDialog();
    } else if (this.status === true) {
    console.log('i dati non sono corretti');
    }

});

}





  }



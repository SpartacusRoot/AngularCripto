import { Component, OnInit,  Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-dialog-post',
  templateUrl: './dialog-post.component.html',
  styleUrls: ['./dialog-post.component.css']
})
export class DialogPostComponent implements OnInit {
  passwordCrypted: any;
result: any;
name: string;
username: string;
password: string;
access: string;
note: string;
resGet: any;
isClickedOnce= false;
isDisabled: boolean;

  constructor(public dialogRef: MatDialogRef<DialogPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.name = this.data.name;
    this.username = this.data.username;
   this.password = this.data.password;
   this.access = this.data.access;
  this.note = this.data.note;

  }
  onClick(searchTerm): void {
    this.isDisabled = false;
    console.log('you submitted value:', this.data);
    this.http.post('api/form', this.data).subscribe(res  => {
    this.result = this.data['results'];
    this.passwordCrypted = res['passwordCrypted'];
    /*
    this.http.get('api/search/' + this.name).subscribe(data1 => {
      this.resGet = data1;
      console.log(data1);
      });
*/
    // this.dialogRef.close();
    this.isDisabled = true;
  });



}


openSnackBar() {
  const ref = this.snackBar
  .open('I tuoi dati sono stati correttamente salvati', 'chiudi', { duration: 5000 });
  console.log('you submitted value:', this.data);
}

}

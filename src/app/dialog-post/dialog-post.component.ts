import { Router } from '@angular/router';
import { Component, OnInit,  Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ClipboardModule } from 'ngx-clipboard';


@Component({
  selector: 'app-dialog-post',
  templateUrl: './dialog-post.component.html',
  styleUrls: ['./dialog-post.component.css']
})
export class DialogPostComponent implements OnInit {
passwordCrypted: any;
error: string;
status: number;
result: any;
name: string;
username: string;
password: string;
access: string;
note: string;
resGet: any;
isClickedOnce = false;
isDisabled: boolean;

  constructor(public dialogRef: MatDialogRef<DialogPostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit() {
  this.name = this.data.name;
  this.username = this.data.username;
  this.password = this.data.password;
  this.access = this.data.access;
  this.note = this.data.note;

  }
  onClick(): void {
    this.isDisabled = false;
    console.log('you submitted value:', this.data);
    this.http.post('api/form', this.data).subscribe(res => {
    this.result = this.data['results'];
    this.passwordCrypted = res['passwordCrypted'];
    this.error = res['error'];
    this.status = res['status'];
    console.log('statusFirst', this.status);
    this.isDisabled = true;
  });


}


sendData(searchTerm: HTMLInputElement) {
  console.log(searchTerm);
  this.http.post('api/decrypta', searchTerm);
  this.router.navigate(['decripta'], { queryParams: {password: searchTerm}});
  this.dialogRef.close();
  }

openSnackBar() {
  const ref = this.snackBar
  .open('Il criptogramma è stato successivamente copiato', 'x', { duration: 2000 });
}

}

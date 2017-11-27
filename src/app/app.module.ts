import { AppComponent } from './app.component';
import { CriptogrammaComponent } from './criptogramma/criptogramma.component';
import {
   RouterModule,
   Routes,
   RouteReuseStrategy
   } from '@angular/router';

 // import { CustomReuseStrategy } from './custom.reuse.strategy';
import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core';
import { Http, HttpModule } from '@angular/http';
// import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {HttpClientModule, HttpParams} from '@angular/common/http';
// angular Material
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSelectModule} from '@angular/material';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatDialogModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatCardModule} from '@angular/material';
import {MatTableModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// component
import { TableBasicExampleComponent } from './table-basic-example/table-basic-example.component';
import { DecryptComponent } from './decrypt/decrypt.component';



// hash url
import { LocationStrategy } from '@angular/common';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { DialogPostComponent } from './dialog-post/dialog-post.component';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import { DecriptaUrlComponent } from './decripta-url/decripta-url.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'edit', component: SearchDetailsComponent, pathMatch: 'prefix'},
  {path: 'ricerca', component: TableBasicExampleComponent, pathMatch: 'prefix'},
  {path: 'api/decrypt', component:  DecryptComponent, pathMatch: 'prefix'},
  {path: 'criptogramma', component: CriptogrammaComponent},
  {path: 'decripta', component: DecriptaUrlComponent, pathMatch: 'prefix'}


];




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableBasicExampleComponent,
    DecryptComponent,
    CriptogrammaComponent,
    SearchDetailsComponent,
    DialogPostComponent,
    DialogUpdateComponent,
    DecriptaUrlComponent


  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    // Material
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule


  ],
  providers: [ // {
  //  provide: RouteReuseStrategy,
  //  useClass: CustomReuseStrategy }
],
  bootstrap: [AppComponent],
  entryComponents: [DialogPostComponent, DialogUpdateComponent]
})
export class AppModule { }

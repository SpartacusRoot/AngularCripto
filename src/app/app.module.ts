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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
// component
import { TableBasicExampleComponent } from './table-basic-example/table-basic-example.component';
import { DecryptComponent } from './decrypt/decrypt.component';



// hash url
import { LocationStrategy } from '@angular/common';
import { SearchDetailsComponent } from './search-details/search-details.component';
import { DialogPostComponent } from './dialog-post/dialog-post.component';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';
import { DecriptaUrlComponent } from './decripta-url/decripta-url.component';

import { ClipboardModule } from 'ngx-clipboard';
import { DialogDecriptComponent } from './dialog-decript/dialog-decript.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { AuthService } from './login/auth.service';
import { AuthguardService } from './authguard.service';
import { AutocompleteService } from './service/autocomplete.service';





const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthguardService] },
  {path: 'edit', component: SearchDetailsComponent, pathMatch: 'prefix', data: {page: 'modifica'},  canActivate: [AuthguardService] },
  {path: 'ricerca', component: TableBasicExampleComponent, pathMatch: 'prefix', data: {page: 'ricerca'}, canActivate: [AuthguardService] },
  {path: 'decrypt', component:  DecryptComponent, pathMatch: 'prefix', data: {page: 'decript'}, canActivate: [AuthguardService] },
  {path: 'criptogramma', component: CriptogrammaComponent, data: {page: 'criptogramma' }, canActivate: [AuthguardService] },
  {path: 'decripta', component: DecriptaUrlComponent, pathMatch: 'prefix', data: {page: 'decripta'}, canActivate: [AuthguardService] }


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
    DecriptaUrlComponent,
    DialogDecriptComponent,
    LoginComponent


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
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    ClipboardModule,
// firebase Auth
AngularFireModule.initializeApp(environment.firebase),
AngularFireAuthModule


  ],
  providers: [ AuthService, AuthguardService, AutocompleteService
    // {
  //  provide: RouteReuseStrategy,
  //  useClass: CustomReuseStrategy }
],
  bootstrap: [AppComponent],
  entryComponents: [DialogPostComponent, DialogUpdateComponent, DialogDecriptComponent]
})
export class AppModule { }

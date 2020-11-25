import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { MatButtonModule, 
  MatInputModule, 
  MatGridListModule, 
  MatCheckboxModule, 
  MatDialogModule, 
  MatSelectModule, 
  MatIconModule, 
  MatRadioModule, 
  MatTableModule, 
  MatCardModule,
  MatToolbarModule,
  MatSnackBarModule, 
  MatDividerModule, 
  MatSidenavModule, 
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatPaginatorModule} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DbServicesComponent } from './components/db-services/db-services.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyaccountComponent,
    NavbarComponent,
    DbServicesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSidenavModule,
    MatListModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

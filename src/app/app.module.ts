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
  MatPaginatorModule,
  MatTabsModule} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DbServicesComponent } from './components/db-services/db-services.component';
import { DataModelsComponent } from './components/data-models/data-models.component';
import { DataModelCreationWizardComponent } from './components/data-models/data-model-creation-wizard/data-model-creation-wizard.component';
import { PropertyListComponent } from './components/data-models/property-list/property-list.component';
import { PropertyWizardComponent } from './components/data-models/property-list/property-wizard/property-wizard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyaccountComponent,
    NavbarComponent,
    DbServicesComponent,
    DataModelsComponent,
    DataModelCreationWizardComponent,
    PropertyListComponent,
    PropertyWizardComponent
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
    MatTabsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    DataModelCreationWizardComponent,
    PropertyWizardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

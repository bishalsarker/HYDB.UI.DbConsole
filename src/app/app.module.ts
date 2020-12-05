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
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { DatamodelSettingsComponent } from './components/data-models/datamodel-settings/datamodel-settings.component';
import { DbserviceWizardComponent } from './components/db-services/dbservice-wizard/dbservice-wizard.component';
import { OperationListComponent } from './components/db-services/operation-list/operation-list.component';
import { ServiceSettingsComponent } from './components/db-services/service-settings/service-settings.component';
import { OperationWizardComponent } from './components/db-services/operation-list/operation-wizard/operation-wizard.component';
import { ScriptEditorComponent } from './components/db-services/operation-list/script-editor/script-editor.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

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
    PropertyWizardComponent,
    ConfirmationDialogComponent,
    DatamodelSettingsComponent,
    DbserviceWizardComponent,
    OperationListComponent,
    ServiceSettingsComponent,
    OperationWizardComponent,
    ScriptEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MonacoEditorModule.forRoot(),
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
    PropertyWizardComponent,
    ConfirmationDialogComponent,
    DbserviceWizardComponent,
    OperationWizardComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

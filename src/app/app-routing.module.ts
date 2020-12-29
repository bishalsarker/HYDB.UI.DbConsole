import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsComponent } from './components/clients/clients.component';
import { DataModelsComponent } from './components/data-models/data-models.component';
import { DbServicesComponent } from './components/db-services/db-services.component';
import { ScriptEditorComponent } from './components/db-services/operation-list/script-editor/script-editor.component';
import { CongratulationsComponent } from './components/join/congratulations/congratulations.component';
import { JoinComponent } from './components/join/join.component';
import { LoginComponent } from './components/login/login.component';
import { MyaccountComponent } from './components/myaccount/myaccount.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginpageGuard } from './guards/loginpage.guard';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'services'
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { isLoginPage: true },
    canActivate: [ LoginpageGuard ]
  },
  {
    path: 'join',
    component: JoinComponent,
    canActivate: [ LoginpageGuard ]
  },
  {
    path: 'congratulations',
    component: CongratulationsComponent,
    canActivate: [ LoginpageGuard ]
  },
  {
    path: 'services',
    component: DbServicesComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'tools/scripteditor',
    component: ScriptEditorComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'datamodels',
    component: DataModelsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'myaccount',
    component: MyaccountComponent,
    canActivate: [ AuthGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

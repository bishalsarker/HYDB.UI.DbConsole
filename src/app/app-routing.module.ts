import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataModelsComponent } from './components/data-models/data-models.component';
import { DbServicesComponent } from './components/db-services/db-services.component';
import { ScriptEditorComponent } from './components/db-services/operation-list/script-editor/script-editor.component';
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

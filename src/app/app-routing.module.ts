import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbServicesComponent } from './components/db-services/db-services.component';
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
    canActivate: [ LoginpageGuard ]
  },
  {
    path: 'services',
    component: DbServicesComponent,
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

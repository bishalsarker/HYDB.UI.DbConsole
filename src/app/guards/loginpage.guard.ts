import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiEndpoints } from '../constants/api-endpoints';
import { HttpheadersService } from '../services/httpheaders.service';

@Injectable({
  providedIn: 'root'
})
export class LoginpageGuard implements CanActivate {

constructor(private httpClient: HttpClient, 
            private router: Router,
            private httpHeaderService: HttpheadersService) {}

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.httpClient.get<any>(`${ApiEndpoints.TOKEN_VERIFY}`, {
      headers: new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('auth_token')}`)
    }).pipe(map(x => {
      if(x.isValid) {
        this.router.navigate(['/services']);
        return false;
      }
      else {
        return true;
      }
    }));
}
  
}

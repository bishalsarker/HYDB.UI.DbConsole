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
export class AuthGuard implements CanActivate {

  constructor(private httpClient: HttpClient, 
              private router: Router,
              private httpHeaderService: HttpheadersService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.httpClient.get<any>(`${ApiEndpoints.TOKEN_VERIFY}`, {
        headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
      }).pipe(map(x => {
        if(x.isValid) {
          return true;
        }
        else {
          this.router.navigate(['/login'], { queryParams: { return_to: state.url }});
          return false;
        }
      }));
  }
  
}

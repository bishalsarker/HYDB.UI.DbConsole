import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpheadersService {
  private headers: any = {
    "Authorization": `Bearer ${localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : null}`
  }

  constructor() {}

  public getHeaders(removeAuth: boolean): any {
    return this.headers;
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpheadersService } from 'src/app/services/httpheaders.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'hydb-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public userName: string = '';

  constructor(private httpClient: HttpClient, private httpHeaderService: HttpheadersService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  private getUserInfo(): void {
    this.httpClient.get<any>(`${environment.constants.api_root}/auth/userinfo`, {
      headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
    }).subscribe(user => {
      this.userName = user.userName;
    });
  }

  public logout(): void {
    localStorage.removeItem('auth_token');
    location.reload();
  }

}

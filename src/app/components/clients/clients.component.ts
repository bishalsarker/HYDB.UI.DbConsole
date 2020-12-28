import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { IClient } from 'src/app/interfaces/IClient';
import { HttpheadersService } from 'src/app/services/httpheaders.service';

@Component({
  selector: 'hydb-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  public isLoaded: boolean = false;
  public allClients: IClient[] = [];

  constructor(private httpClient: HttpClient, 
              private httpHeaderService: HttpheadersService,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadAllClients();
  }

  public loadAllClients(): void {
    this.httpClient.get<any>(ApiEndpoints.CLIENT_GET_ALL_OR_SINGLE, 
    {
      headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
    }).subscribe((response: any) => {
      if(response.data) {
        this.allClients = response.data;
      }
    }, err => {
      this.snackBar.open("Something went wrong", "Dismiss", { duration: 5000 });
    }, () => {
      this.isLoaded = true;
    })
  }

}

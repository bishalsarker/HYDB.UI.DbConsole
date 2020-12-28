import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { IClient } from 'src/app/interfaces/IClient';
import { HttpheadersService } from 'src/app/services/httpheaders.service';
import { ClientWizardComponent } from '../client-wizard/client-wizard.component';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'hydb-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  @Input() public clients: IClient[] = [];

  constructor(
    private httpClient: HttpClient, 
    private dialog: MatDialog, 
    private snackBar: MatSnackBar,
    private httpHeaderService: HttpheadersService) { }

  ngOnInit() {
  }

  public openClientWizard(create: boolean, clientModel?: IClient): void {
    const model: IClient = this.getClientModel(create, clientModel);
    const dialogRef = this.dialog.open(ClientWizardComponent, {
      width: '500px',
      data: { 
        isNew: create,
        clientModel: model
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createOrUpdateClient(create, result.clientModel);
      }
    });
  }

  private getClientModel(create: boolean, clientModel: IClient) {
    const model: IClient = {
      id: '',
      name: '',
      apiKey: ''
    };

    if (!create && clientModel) {
      model.id = clientModel.id;
      model.name = clientModel.name;
    }
    
    return model;
  }

  public createOrUpdateClient(create: boolean, newClient: IClient): void {
    this.httpClient
      .post<IClient>(this.getAddOrUpdateApiUrl(create), newClient, {
        headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
      })
      .subscribe((response: any) => {
        this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
        if(response.isSuccess) {
          const savedClient: IClient = cloneDeep(response.data);        
          this.addOrUpdateClientList(create, savedClient);
        }
      }, err => {
        this.snackBar.open('Something went wrong', 'Dismiss', { duration: 3000 });
      });
  }

  private addOrUpdateClientList(create: boolean, savedClient: IClient) {
    if (!create) {
      this.clients.forEach((client) => {
        if (savedClient.id === client.id) {
          client.name = savedClient.name;
          return;
        }
      });
    } else {
      this.clients.push(savedClient);
    }
  }

  private getAddOrUpdateApiUrl(create: boolean): string {
    let url: string = ApiEndpoints.CLIENT_ADD_NEW;

    if(!create) {
      url = ApiEndpoints.CLIENT_UPDATE;
    }

    return url
  }

  public get hasClients(): boolean {
    return this.clients.length != 0;
  }

}

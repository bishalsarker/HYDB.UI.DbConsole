import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { HttpheadersService } from 'src/app/services/httpheaders.service';
import * as _ from 'lodash';
import { IService } from 'src/app/interfaces/IService';
import { DbserviceWizardComponent } from './dbservice-wizard/dbservice-wizard.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'hydb-db-services',
  templateUrl: './db-services.component.html',
  styleUrls: ['./db-services.component.scss']
})
export class DbServicesComponent implements OnInit {

  public isLoaded: boolean = false;
  public selectedTab: number = 0;
  public services: IService[] = [];
  public selectedServiceId: string = '';

  constructor(private httpClient: HttpClient,
              private httpHeaderService: HttpheadersService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const showParam = params['show'];

      if (showParam) {
        this.loadAllServices(false, showParam);
      } else {
        this.loadAllServices(true);
      }
    })
  }

  public openServiceWizard(create: boolean, service?: IService): void {
    const newService: IService = this.getService(create, service);
    const dialogRef = this.dialog.open(DbserviceWizardComponent, {
      width: '500px',
      data: { 
        isNew: create,
        service: newService 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveOrUpdateService(create, result.service);
      }
    });
  }

  private getAddOrUpdateApiUrl(create: boolean): string {
    let url: string = ApiEndpoints.SERVICES_ADD_NEW;

    if(!create) {
      url = ApiEndpoints.SERVICES_UPDATE;
    }

    return url;
  }

  private getService(create: boolean, service: IService) {
    const model: IService = {
      id: '',
      name: '',
      operations: []
    };

    if (!create && service) {
      model.id = service.id;
      model.name = service.name;
    }
    
    return model;
  }

  private saveOrUpdateService(create: boolean, newService: IService): void {
    this.isLoaded = false;
    this.httpClient
      .post<IService>(this.getAddOrUpdateApiUrl(create), newService, {
        headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
      })
      .subscribe((response: any) => {
        this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
        if(response.isSuccess) {
          const savedService: IService = _.cloneDeep(response.data);
          this.addOrUpdateService(create, savedService);
          this.selectedServiceId = savedService.id;
        }
      }, err => {
        this.snackBar.open('Something went wrong', 'Dismiss', { duration: 3000 });
      }, () => {
        this.isLoaded = true;
      });
  }

  private addOrUpdateService(create: boolean, savedService: IService) {
    if (!create) {
      this.services.forEach((dm) => {
        if (savedService.id === dm.id) {
          dm.name = savedService.name;
          return;
        }
      });
    } else {
      this.services.push(savedService);
    }
  }

  public loadAllServices(setDefault: boolean, serviceId?: string): void {
    this.isLoaded = false;
    this.httpClient
      .get<IService[]>(ApiEndpoints.SERVICES_GET_ALL_OR_SINGLE, {
        headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
      })
      .subscribe(response => {
        this.services = _.cloneDeep(response);
        if (this.services.length > 0) {
          this.selectedTab = 0;
          if (setDefault) {
            this.selectedServiceId = this.services[0].id;
          }

          if(!setDefault && serviceId) {
            this.selectedServiceId = serviceId;
          }
        }
      }, err => {
        this.snackBar.open(`Something went wrong`, '', { duration: 5000 });
      }, () => {
        this.isLoaded = true;
      });
  }

  public onSelectionChange(): void {
    this.selectedTab = 0;
  }

  public get selectedService(): IService {
    const matchedService: IService = _.find(this.services, ['id', this.selectedServiceId]);

    if(matchedService) {
      return matchedService;
    } else {
      return { 
        id: '', 
        name: '', 
        operations: [] 
      };
    }
  }

  public get hasNoServices(): boolean {
    return this.services.length < 1;
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { IDataModel } from 'src/app/interfaces/IDataModel';
import * as _ from 'lodash';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DataModelCreationWizardComponent } from './data-model-creation-wizard/data-model-creation-wizard.component';
import { HttpheadersService } from 'src/app/services/httpheaders.service';

@Component({
  selector: 'hydb-data-models',
  templateUrl: './data-models.component.html',
  styleUrls: ['./data-models.component.scss']
})
export class DataModelsComponent implements OnInit {
  public isLoaded: boolean = false;
  public selectedTab: number = 0;
  public dataModels: IDataModel[] = [];
  public selectedDataModelId: string = '';

  constructor(private httpClient: HttpClient,
              private httpHeaderService: HttpheadersService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadAllDataModels();
  }

  public openDataModelCreationWizard(create: boolean, dataModel?: IDataModel): void {
    const newDataModel: IDataModel = this.getDataModel(create, dataModel);
    const dialogRef = this.dialog.open(DataModelCreationWizardComponent, {
      width: '500px',
      data: { 
        isNew: create,
        dataModel: newDataModel 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveOrUpdateDataModel(create, result.dataModel);
      }
    });
  }

  private getAddOrUpdateApiUrl(create: boolean): string {
    let url: string = ApiEndpoints.DATA_MODELS_ADD_NEW;

    if(!create) {
      url = ApiEndpoints.DATA_MODELS_UPDATE;
    }

    return url;
  }

  private getDataModel(create: boolean, dataModel: IDataModel) {
    const model: IDataModel = {
      id: '',
      name: '',
      properties: []
    };

    if (!create && dataModel) {
      model.id = dataModel.id;
      model.name = dataModel.name;
    }
    
    return model;
  }

  private saveOrUpdateDataModel(create: boolean, newDataModel: IDataModel): void {
    this.httpClient
      .post<IDataModel>(this.getAddOrUpdateApiUrl(create), newDataModel, {
        headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
      })
      .subscribe((response: any) => {
        this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
        if(response.isSuccess) {
          const savedDataModel: IDataModel = _.cloneDeep(response.data);
          this. addOrUpdateDataModel(create, savedDataModel);
          this.selectedDataModelId = savedDataModel.id;
        }
      });
  }

  private addOrUpdateDataModel(create: boolean, savedDataModel: IDataModel) {
    if (!create) {
      this.dataModels.forEach((dm) => {
        if (savedDataModel.id === dm.id) {
          dm.name = savedDataModel.name;
          return;
        }
      });
    } else {
      this.dataModels.push(savedDataModel);
    }
  }

  public loadAllDataModels(): void {
    this.isLoaded = false;
    this.httpClient
      .get<IDataModel[]>(ApiEndpoints.DATA_MODELS_GET_ALL_OR_SINGLE, {
        headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
      })
      .subscribe(response => {
        this.dataModels = _.cloneDeep(response);
        if (this.dataModels.length > 0) {
          this.selectedTab = 0;
          this.selectedDataModelId = this.dataModels[0].id;
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

  public get selectedDataModel(): IDataModel {
    const matchedDataModel: IDataModel = _.find(this.dataModels, ['id', this.selectedDataModelId]);

    if(matchedDataModel) {
      return matchedDataModel;
    } else {
      return { 
        id: '', 
        name: '', 
        properties: [] 
      };
    }
  }

  public get hasNoDataModels(): boolean {
    return this.dataModels.length < 1;
  }
}

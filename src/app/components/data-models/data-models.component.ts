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

  public openDataModelCreationWizard(): void {
    const dialogRef = this.dialog.open(DataModelCreationWizardComponent, {
      width: '500px',
      data: { 
        id: '', 
        name: '' 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveDataModel(result);
      }
    });
  }

  private saveDataModel(newDataModel: IDataModel): void {
    this.httpClient
      .post<IDataModel>(ApiEndpoints.DATA_MODELS_ADD_NEW, newDataModel, {
        headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
      })
      .subscribe((response: any) => {
        this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
        if(response.isSuccess) {
          const savedDataModel: IDataModel = _.cloneDeep(response.data);
          this.dataModels.push(savedDataModel);
          this.selectedDataModelId = savedDataModel.id;
        }
      });
  }

  public loadAllDataModels(): void {
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
      });
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

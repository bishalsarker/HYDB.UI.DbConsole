import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { IDataModel, IDataModelProperty } from 'src/app/interfaces/IDataModel';
import { HttpheadersService } from 'src/app/services/httpheaders.service';
import { PropertyWizardComponent } from './property-wizard/property-wizard.component';
import * as _ from 'lodash';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'hydb-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  public isLoaded: boolean = true;
  @Input() dataModel: IDataModel;

  constructor(private httpClient: HttpClient, 
              private dialog: MatDialog, 
              private snackBar: MatSnackBar,
              private httpHeaderService: HttpheadersService) { }

  ngOnInit() {
  }

  public get hasProperties(): boolean {
    if(this.dataModel) {
      return this.dataModel.properties.length > 0;
    }
  }

  private getAddOrUpdateApiUrl(create: boolean): string {
    let url: string = ApiEndpoints.DATA_MODEL_PROPERTIES_ADD_NEW;

    if(!create) {
      url = ApiEndpoints.DATA_MODEL_PROPERTIES_UPDATE;
    }

    return url
  }

  public openPropertyWizard(create: boolean, propertyModel?: IDataModelProperty): void {
    const model: IDataModelProperty = this.getPropertyModel(create, propertyModel);
    const dialogRef = this.dialog.open(PropertyWizardComponent, {
      width: '500px',
      data: { 
        isNew: create,
        propertyModel: model
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createOrUpdateProperty(create, result.propertyModel);
      }
    });
  }

  private getPropertyModel(create: boolean, propertyModel: IDataModelProperty) {
    const model: IDataModelProperty = {
      id: '',
      name: '',
      type: '',
      dataModelId: this.dataModel.id
    };

    if (!create && propertyModel) {
      model.id = propertyModel.id;
      model.name = propertyModel.name;
      model.type = propertyModel.type;
    }
    
    return model;
  }

  public createOrUpdateProperty(create: boolean, newProperty: IDataModelProperty): void {
    this.isLoaded = false;
    this.httpClient
      .post<IDataModelProperty>(this.getAddOrUpdateApiUrl(create), newProperty, {
        headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
      })
      .subscribe((response: any) => {
        this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
        if(response.isSuccess) {
          const savedProperty: IDataModelProperty = _.cloneDeep(response.data);        
          this.addOrUpdatePropertyList(create, savedProperty);
        }
      }, err => {
        this.snackBar.open('Something went wrong', 'Dismiss', { duration: 3000 });
      }, () => {
        this.isLoaded = true;
      });
  }

  private addOrUpdatePropertyList(create: boolean, savedProperty: IDataModelProperty) {
    if (!create) {
      this.dataModel.properties.forEach((prop) => {
        if (savedProperty.id === prop.id) {
          prop.name = savedProperty.name;
          prop.type = savedProperty.type;
          return;
        }
      });
    } else {
      this.dataModel.properties.push(savedProperty);
    }
  }

  public deleteProperty(property: IDataModelProperty): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { 
        message: 'By removing this property it will also remove all the saved data for this property. Are you sure you want to delete this property?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoaded = false;
        this.httpClient
          .get<any>(ApiEndpoints.DATA_MODEL_PROPERTIES_REMOVE, {
            params: { propId: property.id },
            headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
          })
          .subscribe((response: any) => {
            this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
            this.dataModel.properties = _.remove(this.dataModel.properties, (o) => {
              return o.id !== property.id;
            })
          }, err => {
            this.snackBar.open('Something went wrong', 'Dismiss', { duration: 3000 });
          }, () => {
            this.isLoaded = true;
          });
      }
    });
  }

}

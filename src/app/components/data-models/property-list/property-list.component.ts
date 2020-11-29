import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { IDataModel, IDataModelProperty } from 'src/app/interfaces/IDataModel';
import { HttpheadersService } from 'src/app/services/httpheaders.service';
import { PropertyWizardComponent } from './property-wizard/property-wizard.component';
import * as _ from 'lodash';

@Component({
  selector: 'hydb-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  @Input() dataModel: IDataModel;

  constructor(private httpClient: HttpClient, 
              private dialog: MatDialog, 
              private snackBar: MatSnackBar,
              private httpHeaderService: HttpheadersService) { }

  ngOnInit() {
  }

  public openPropertyWizard(): void {
    const dialogRef = this.dialog.open(PropertyWizardComponent, {
      width: '500px',
      data: { 
        id: '', 
        name: '',
        type: '',
        dataModelId: this.dataModel.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addProperty(result);
      }
    });
  }

  public addProperty(newProperty: IDataModelProperty): void {
    this.httpClient
      .post<IDataModelProperty>(ApiEndpoints.DATA_MODEL_PROPERTIES_ADD_NEW, newProperty, {
        headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
      })
      .subscribe((response: any) => {
        this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
        if(response.isSuccess) {
          const savedProperty: IDataModelProperty = _.cloneDeep(response.data);
          this.dataModel.properties.push(savedProperty);
        }
      });
  }

}

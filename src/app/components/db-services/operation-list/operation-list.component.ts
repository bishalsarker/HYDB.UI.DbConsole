import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { IOperation, IService } from 'src/app/interfaces/IService';
import { HttpheadersService } from 'src/app/services/httpheaders.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { OperationWizardComponent } from './operation-wizard/operation-wizard.component';
import * as _ from 'lodash';
import { Router } from '@angular/router';

@Component({
  selector: 'hydb-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss']
})
export class OperationListComponent implements OnInit {

  public isLoaded: boolean = true;
  @Input() service: IService;

  constructor(private httpClient: HttpClient, 
              private dialog: MatDialog, 
              private snackBar: MatSnackBar,
              private router: Router,
              private httpHeaderService: HttpheadersService) { }

  ngOnInit() {
  }

  public get hasOperations(): boolean {
    if(this.service) {
      return this.service.operations.length > 0;
    }
  }

  private getAddOrUpdateApiUrl(create: boolean): string {
    let url: string = ApiEndpoints.SERVICES_OPERATIONS_ADD_NEW;

    if(!create) {
      url = ApiEndpoints.SERVICES_OPERATIONS_UPDATE;
    }

    return url
  }

  public openOperationWizard(create: boolean, operationModel?: IOperation): void {
    const model: IOperation = this.getOperationModel(create, operationModel);
    const dialogRef = this.dialog.open(OperationWizardComponent, {
      width: '500px',
      data: { 
        isNew: create,
        operationModel: model
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createOrUpdateOperation(create, result.operationModel);
      }
    });
  }

  public openScriptEditor({ id }: IOperation): void {
    this.router.navigate(['/tools/scripteditor'], {
      queryParams: {
        op_id: id,
        ref: this.service.id
      }
    });
  }

  private getOperationModel(create: boolean, operation: IOperation) {
    const model: IOperation = {
      id: '',
      name: '',
      type: '',
      script: '',
      serviceId: this.service.id
    };

    if (!create && operation) {
      model.id = operation.id;
      model.name = operation.name;
      model.type = operation.type;
    }
    
    return model;
  }

  public createOrUpdateOperation(create: boolean, newOperation: IOperation): void {
    this.isLoaded = false;
    this.httpClient
      .post<IOperation>(this.getAddOrUpdateApiUrl(create), newOperation, {
        headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
      })
      .subscribe((response: any) => {
        this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
        if(response.isSuccess) {
          const savedOperation: IOperation = _.cloneDeep(response.data);        
          this.addOrUpdateOperationList(create, savedOperation);
        }
      }, err => {
        this.snackBar.open('Something went wrong', 'Dismiss', { duration: 3000 });
      }, () => {
        this.isLoaded = true;
      });
  }

  private addOrUpdateOperationList(create: boolean, savedOperation: IOperation) {
    if (!create) {
      this.service.operations.forEach((op) => {
        if (savedOperation.id === op.id) {
          op.name = savedOperation.name;
          op.type = savedOperation.type;
          return;
        }
      });
    } else {
      this.service.operations.push(savedOperation);
    }
  }

  public deleteOperation(operation: IOperation): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { 
        message: 'Are you sure you want to delete this operation?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isLoaded = false;
        this.httpClient
          .get<any>(ApiEndpoints.SERVICES_OPERATIONS_REMOVE, {
            params: { opId: operation.id },
            headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
          })
          .subscribe((response: any) => {
            this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
            this.service.operations = _.remove(this.service.operations, (o) => {
              return o.id !== operation.id;
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

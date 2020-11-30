import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { IDataModel } from 'src/app/interfaces/IDataModel';
import { HttpheadersService } from 'src/app/services/httpheaders.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'hydb-datamodel-settings',
  templateUrl: './datamodel-settings.component.html',
  styleUrls: ['./datamodel-settings.component.scss']
})
export class DatamodelSettingsComponent implements OnInit {
  @Input() dataModel: IDataModel;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private httpClient: HttpClient, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private httpHeaderService: HttpheadersService) { }

  ngOnInit() {
  }

  public openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { 
        message: `This operation will remove this data model along with it's properties and saved data. Are you sure you want to delete this data model?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpClient
          .get<any>(ApiEndpoints.DATA_MODELS_REMOVE, {
            params: { modelId: this.dataModel.id },
            headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
          })
          .subscribe((response: any) => {
            this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
            if(response.isSuccess) {
              this.refresh.emit();
            }
          });
      }
    });
  }

}

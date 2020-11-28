import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDataModel } from 'src/app/interfaces/IDataModel';
import { DataModelsComponent } from '../data-models.component';

@Component({
  selector: 'hydb-data-model-creation-wizard',
  templateUrl: './data-model-creation-wizard.component.html',
  styleUrls: ['./data-model-creation-wizard.component.scss']
})
export class DataModelCreationWizardComponent {

  constructor(
    public dialogRef: MatDialogRef<DataModelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDataModel) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.dialogRef.close(this.data);
  }

}

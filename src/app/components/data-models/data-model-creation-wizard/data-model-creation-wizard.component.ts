import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDataModel } from 'src/app/interfaces/IDataModel';
import { DataModelsComponent } from '../data-models.component';

@Component({
  selector: 'hydb-data-model-creation-wizard',
  templateUrl: './data-model-creation-wizard.component.html',
  styleUrls: ['./data-model-creation-wizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DataModelCreationWizardComponent {
  public dataModelName: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z_]*$')
  ]);

  constructor(
    public dialogRef: MatDialogRef<DataModelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDataModel) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.data.name = this.dataModelName.value;
    this.dialogRef.close(this.data);
  }

}

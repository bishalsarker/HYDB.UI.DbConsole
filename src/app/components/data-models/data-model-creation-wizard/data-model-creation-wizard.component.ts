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
export class DataModelCreationWizardComponent implements OnInit {
  public dialogTitle: string = 'Add new data model';
  public createActionBtnTxt: string = 'Create';
  public dataModelName: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z_]*$')
  ]);

  ngOnInit(): void {
    if(!this.data.isNew) {
      this.dialogTitle = 'Update Property';
      this.createActionBtnTxt = 'Update';
      this.dataModelName.setValue(this.data.dataModel.name);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<DataModelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.data.dataModel.name = this.dataModelName.value;
    this.dialogRef.close(this.data);
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PropertyListComponent } from 'src/app/components/data-models/property-list/property-list.component';

@Component({
  selector: 'hydb-operation-wizard',
  templateUrl: './operation-wizard.component.html',
  styleUrls: ['./operation-wizard.component.scss']
})
export class OperationWizardComponent implements OnInit {
  public dialogTitle: string = 'New Operation';
  public createActionBtnTxt: string = 'Create';
  public operationName: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z_]*$')
  ]);

  public operationType: FormControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<PropertyListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    if(!this.data.isNew) {
      this.dialogTitle = 'Update Operation';
      this.createActionBtnTxt = 'Update';
      this.operationName.setValue(this.data.operationModel.name);
      this.operationType.setValue(this.data.operationModel.type);
    }
  }

  public onCreateClick(): void {
    this.data.operationModel.name = this.operationName.value;
    this.data.operationModel.type = this.operationType.value;
    this.dialogRef.close(this.data);
  }

}

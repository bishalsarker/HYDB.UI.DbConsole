import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataModelsComponent } from '../../data-models/data-models.component';
import { DbServicesComponent } from '../db-services.component';

@Component({
  selector: 'hydb-dbservice-wizard',
  templateUrl: './dbservice-wizard.component.html',
  styleUrls: ['./dbservice-wizard.component.scss']
})
export class DbserviceWizardComponent implements OnInit {

  public dialogTitle: string = 'Add new service';
  public createActionBtnTxt: string = 'Create';
  public serviceName: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z_]*$')
  ]);

  ngOnInit(): void {
    if(!this.data.isNew) {
      this.dialogTitle = 'Update Service';
      this.createActionBtnTxt = 'Update';
      this.serviceName.setValue(this.data.service.name);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<DbServicesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.data.service.name = this.serviceName.value;
    this.dialogRef.close(this.data);
  }

}

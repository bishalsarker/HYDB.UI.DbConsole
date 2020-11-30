import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDataModelProperty } from 'src/app/interfaces/IDataModel';
import { PropertyListComponent } from '../property-list.component';

@Component({
  selector: 'hydb-property-wizard',
  templateUrl: './property-wizard.component.html',
  styleUrls: ['./property-wizard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PropertyWizardComponent implements OnInit {
  public dialogTitle: string = 'New Property';
  public createActionBtnTxt: string = 'Create';
  public propertyName: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z_]*$')
  ]);

  public propertyType: FormControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<PropertyListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    console.log(this.data);
    if(!this.data.isNew) {
      this.dialogTitle = 'Update Property';
      this.createActionBtnTxt = 'Update';
      this.propertyName.setValue(this.data.propertyModel.name);
      this.propertyType.setValue(this.data.propertyModel.type);
    }
  }

  public onCreateClick(): void {
    this.data.propertyModel.name = this.propertyName.value;
    this.data.propertyModel.type = this.propertyType.value;
    this.dialogRef.close(this.data);
  }

}

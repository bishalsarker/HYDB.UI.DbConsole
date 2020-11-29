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

  public propertyName: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z_]*$')
  ]);

  public propertyType: FormControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<PropertyListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDataModelProperty) {}


  ngOnInit() {
  }

  public onCreateClick(): void {
    this.data.name = this.propertyName.value;
    this.data.type = this.propertyType.value;
    this.dialogRef.close(this.data);
  }

}

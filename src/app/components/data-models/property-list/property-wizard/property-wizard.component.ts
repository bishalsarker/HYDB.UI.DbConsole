import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDataModelProperty } from 'src/app/interfaces/IDataModel';
import { PropertyListComponent } from '../property-list.component';

@Component({
  selector: 'hydb-property-wizard',
  templateUrl: './property-wizard.component.html',
  styleUrls: ['./property-wizard.component.scss']
})
export class PropertyWizardComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PropertyListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDataModelProperty) {}


  ngOnInit() {
  }

  public onCreateClick(): void {
    this.dialogRef.close(this.data);
  }

}

import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PropertyListComponent } from '../property-list.component';
import { includes } from 'lodash';

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
  public blockedKeywords: string[] = ['id'];
  public hasBlockedKeywordError: boolean = false;

  public propertyType: FormControl = new FormControl('', Validators.required);

  constructor(public dialogRef: MatDialogRef<PropertyListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  ngOnInit() {
    if(!this.data.isNew) {
      this.dialogTitle = 'Update Property';
      this.createActionBtnTxt = 'Update';
      this.propertyName.setValue(this.data.propertyModel.name);
      this.propertyType.setValue(this.data.propertyModel.type);
    }

    this.propertyName.valueChanges.subscribe(val => {
      this.hasBlockedKeywordError = false;
    });
  }

  public onCreateClick(): void {
    this.data.propertyModel.name = this.propertyName.value;
    this.data.propertyModel.type = this.propertyType.value;

    if(this.hasBlockedKeyword(this.data.propertyModel.name)) {
      this.hasBlockedKeywordError = true;
    }

    if(!this.hasBlockedKeywordError) {
      this.dialogRef.close(this.data);
    }
  }

  private hasBlockedKeyword(keyword: string): boolean {
    return includes(this.blockedKeywords, keyword);
  }

}

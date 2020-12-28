import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientsComponent } from '../clients.component';

@Component({
  selector: 'hydb-client-wizard',
  templateUrl: './client-wizard.component.html',
  styleUrls: ['./client-wizard.component.scss']
})
export class ClientWizardComponent implements OnInit {

  public dialogTitle: string = 'Add new client';
  public createActionBtnTxt: string = 'Create';
  public clientName: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z_]*$')
  ]);

  ngOnInit(): void {
    if(!this.data.isNew) {
      this.dialogTitle = 'Update Client';
      this.createActionBtnTxt = 'Update';
      this.clientName.setValue(this.data.clientModel.name);
    }
  }

  constructor(
    public dialogRef: MatDialogRef<ClientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onCreateClick(): void {
    this.data.clientModel.name = this.clientName.value;
    this.dialogRef.close(this.data);
  }

}

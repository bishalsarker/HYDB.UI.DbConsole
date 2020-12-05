import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { IService } from 'src/app/interfaces/IService';
import { HttpheadersService } from 'src/app/services/httpheaders.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'hydb-service-settings',
  templateUrl: './service-settings.component.html',
  styleUrls: ['./service-settings.component.scss']
})
export class ServiceSettingsComponent implements OnInit {

  @Input() service: IService;
  @Output() refresh: EventEmitter<void> = new EventEmitter<void>();
  @Output() rename: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private httpClient: HttpClient, 
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private httpHeaderService: HttpheadersService) { }

  ngOnInit() {
  }

  public openDeleteConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { 
        message: `This will remove this service along with it's operations and scripts. Are you sure you want to do this?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpClient
          .get<any>(ApiEndpoints.SERVICES_REMOVE, {
            params: { serviceId: this.service.id },
            headers: new HttpHeaders(this.httpHeaderService.getHeaders(false))
          })
          .subscribe((response: any) => {
            this.snackBar.open(response.message, 'Dismiss', { duration: 3000 });
            if(response.isSuccess) {
              this.router.navigateByUrl('/services');
            }
          });
      }
    });
  }

  public renameService(): void {
    this.rename.emit();
  }

}

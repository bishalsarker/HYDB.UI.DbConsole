import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { IOperation, IService } from 'src/app/interfaces/IService';
import { HttpheadersService } from 'src/app/services/httpheaders.service';

@Component({
  selector: 'hydb-script-editor',
  templateUrl: './script-editor.component.html',
  styleUrls: ['./script-editor.component.scss']
})
export class ScriptEditorComponent implements OnInit, AfterViewInit {
  public editorOptions: any;
  public isLoaded: boolean = false;
  public operation: IOperation;
  public service: IService;

  constructor(private httpClient: HttpClient,
              private httpHeaderService: HttpheadersService,
              private route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const opIdParam = params['op_id'];
      const serviceIdParam = params['ref'];

      if(opIdParam && serviceIdParam) {
        forkJoin([this.getServiceInfo(serviceIdParam), this.getOperationInfo(opIdParam)])
        .subscribe(responses => {
          this.service = responses[0];
          this.operation = responses[1];
        }, err => {}, () => {
          this.isLoaded = true;
        });
      }
    })
  }

  ngAfterViewInit(): void {
    this.editorOptions = this.geteditorOptions();
  }

  public getOperationInfo(operationId: string): Observable<IOperation> {
    this.isLoaded = false;
    return this.httpClient
        .get<IOperation>(ApiEndpoints.SERVICES_OPERATIONS_GET_ALL_OR_SINGLE, {
          params: { opId: operationId },
          headers: this.httpHeaderService.getHeaders(false)
    });
  }

  public getServiceInfo(serviceId: string): Observable<IService> {
    this.isLoaded = false;
    return this.httpClient
        .get<IService>(ApiEndpoints.SERVICES_GET_ALL_OR_SINGLE, {
          params: { serviceId: serviceId },
          headers: this.httpHeaderService.getHeaders(false)
    });
  }

  public backToList(): void {
    this.router.navigate(['/services'], {
      queryParams: {
        show: this.service.id
      }
    });
  }

  public geteditorOptions(): any {
    return {
      theme: 'vs', 
      language: 'json',
      minimap: { enabled: false },
      scrollbar: {
        useShadows: false, 
        verticalHasArrows: true,
        horizontalHasArrows: true,
        vertical: 'visible',
        horizontal: 'visible',
        verticalScrollbarSize: 17,
        horizontalScrollbarSize: 17,
        arrowSize: 30
      }
    };
  }

}

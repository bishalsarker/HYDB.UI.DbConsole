import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiEndpoints } from 'src/app/constants/api-endpoints';
import { IUser } from 'src/app/interfaces/IUser';

@Component({
  selector: 'ac-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public appName: string = "</hydb>";
  public loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public showButton: boolean = true;
  public hasError: boolean = false;
  public errorMessage: string = '';

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  signIn(): void {
    this.showButton = false;
    const loginInfo: IUser = {
      userName: this.userName.value,
      password: this.password.value
    }; 
    this.httpClient.post<any>(`${ApiEndpoints.TOKEN_GET}`, loginInfo)
    .subscribe((response) => {
      localStorage.setItem('auth_token', response.token);
      if(this.route.snapshot.queryParams.return_to) {
        this.router.navigateByUrl(this.route.snapshot.queryParams.return_to);
      } else {
        this.router.navigateByUrl('/apps');
      }
    }, err => {
      this.hasError = true;
      this.errorMessage = err.error;
      this.showButton = true;
    })
  }

  public get userName(): AbstractControl {
    return this.loginForm.get('userName');
  }

  public get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}

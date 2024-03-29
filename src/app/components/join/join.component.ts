import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  public appName: string = '</hydb>';

  public regForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    rePassword: new FormControl('')
  });

  public showButton: boolean = true;
  public hasError: boolean = false;
  public errorMessage: string = '';

  constructor(public httpClient: HttpClient, public router: Router) {}

  ngOnInit() {
  }

  public createAccount(): void {
    this.showButton = false;
    this.matchPasswords();
    if(!this.hasError) {
      this.httpClient.post<any>(`${environment.constants.api_root}/auth/createaccount`, {
        userName: this.userName.value,
        email: this.email.value,
        password: this.password.value
      }).subscribe(response => {
        if(!response.isSuccess) {
          this.hasError = true;
          this.errorMessage = response.message;
        } else {
          this.router.navigateByUrl('/congratulations');
        }
      }, err => {}, () => {
        this.showButton = true;
      });
    }
  }

  private matchPasswords() {
    if (!this.checkIfPasswordsMatches()) {
      this.hasError = true;
      this.errorMessage = "Passwords doesn't match";
      this.showButton = true;
    } else {
      this.hasError = false;
    }
  }

  public get userName(): AbstractControl {
    return this.regForm.get('userName');
  }

  public get email(): AbstractControl {
    return this.regForm.get('email');
  }

  public get password(): AbstractControl {
    return this.regForm.get('password');
  }

  public get rePassword(): AbstractControl {
    return this.regForm.get('rePassword');
  }

  public checkIfPasswordsMatches(): boolean {
    return (this.password.value === this.rePassword.value);
  }

}

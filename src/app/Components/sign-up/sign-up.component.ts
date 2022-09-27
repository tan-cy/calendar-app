import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  REGEX_PASS,
  ERR_PASS_POL,
  ERR_PASS_MATCH,
} from 'src/app/Constants/User';
import { IUser, CognitoService } from '../../Services/cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  loading: boolean;
  user: IUser;
  errorMessage: string = '';

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  passwordValidate(password: string): void {
    if (!REGEX_PASS.test(password) || password.length < 5) {
      this.user.password = '';
      this.errorMessage = ERR_PASS_POL;
    }
    if (password !== this.user.confirmPassword) {
      this.errorMessage = ERR_PASS_MATCH;
      this.user.password = '';
      this.user.confirmPassword = '';
    }
  }
  seeError(e: Error): void {
    this.errorMessage = e.message;
  }

  submitUserToCognito() {
    this.cognitoService
      .signUp(this.user)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/confirm-user'], {
          queryParams: { user: JSON.stringify(this.user) },
        });
      })
      .catch((e) => {
        this.seeError(e);
      });
  }

  public signUp(): void {
    this.passwordValidate(this.user.password);
    this.loading = true;
    if (!this.errorMessage) {
      this.submitUserToCognito();
    }
  }
}

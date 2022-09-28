import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  REGEX_PASS,
  ERROR_PASS_POL,
  ERROR_PASS_MATCH,
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
  errorMessage?: string;

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  private resetPasswordFields(): void {
    this.user.password = '';
    this.user.confirmPassword = '';
  }
  passwordValidate(password: string): void {
    if (!REGEX_PASS.test(password) || password.length < 5) {
      this.errorMessage = ERROR_PASS_POL;
      this.resetPasswordFields();
    } else if (password !== this.user.confirmPassword) {
      this.errorMessage = ERROR_PASS_MATCH;
      this.resetPasswordFields();
    }
  }
  seeError(e: Error): void {
    this.errorMessage = e.message;
  }

  submitUserToCognito() {
    this.cognitoService
      .signUp(this.user)
      .then(() => {
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
    this.errorMessage = undefined;
    this.loading = false;
  }
}

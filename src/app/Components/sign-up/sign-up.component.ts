import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../../Services/cognito.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  loading: boolean;
  user: IUser;
  public errorInSignUp: string = '';
  public errorMessage: string = '';

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  passwordValidate(password: string): void {
    const regexPassword = /^[\S]+.*[\S]+$/;
    let validatePassword = (<HTMLInputElement>(
      document.getElementById('confirmPassword')
    )).value;

    if (!regexPassword.test(password) && password.length > 0) {
      this.user.password = '';
      this.errorMessage =
        'Password must contain at least 1 uppercase letter and one lowercase letter';
    }
    if (password !== validatePassword) {
      this.user.password = '';
      (<HTMLInputElement>document.getElementById('confirmPassword')).value = '';
      this.errorMessage = 'The passwords do not match';
    }
  }
  seeError(e: Error): void {
    this.errorInSignUp = 'There was a problem';
    this.loading = false;
    const error = JSON.parse(JSON.stringify(e));
    this.errorMessage = error.log;
    console.log(error);
  }

  cognito() {
    this.cognitoService
      .signUp(this.user)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/confirm-user'], {
          queryParams: { user: JSON.stringify(this.user) },
        });
      })
      .catch((e) => {
<<<<<<< HEAD
        this.seeError(e);
=======
        console.error('Error in sign up..');
        console.log(e);
        this.loading = false;
        console.log(e);
        console.log(JSON.parse(JSON.stringify(e)));
        const error = JSON.parse(JSON.stringify(e));
        if (error.name === 'AuthError') {
          this.errorMessage = error.log;
        } else if (error.name === 'InvalidParameterException') {
          this.errorMessage = 'Come back to me later';
        }
>>>>>>> c3b1eca (need to fix regex on password)
      });
  }

  public signUp(): void {
    console.log(this.user);
    this.passwordValidate(this.user.password);
    this.loading = true;
    if (!this.errorMessage) {
      this.cognito();
    }
  }
}

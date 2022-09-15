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
  public errorMessage: string = '';

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public signUp(): void {
    this.loading = true;
    this.cognitoService
      .signUp(this.user)
      .then(() => {
        this.loading = false;
        this.router.navigate(['/confirm-user'], {
          queryParams: { user: JSON.stringify(this.user) },
        });
      })
      .catch((e) => {
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
      });
  }
}

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
        this.router.navigate(['/calendar-view']);
      })
      .catch((e) => {
        console.log(e);
        this.loading = false;
      });
  }
}

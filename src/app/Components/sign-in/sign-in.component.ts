import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ERROR_INCORRECT_LOGIN } from 'src/app/Constants/User';
import { IUser, CognitoService } from '../../Services/cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  user: IUser;
  loading: boolean;
  errorMessage: string = '';

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.user = {} as IUser;
    this.loading = false;
  }

  ngOnInit(): void {}

  public signIn(): void {
    this.loading = true;
    this.cognitoService
      .signIn(this.user)
      .then(() => {
        this.router.navigate(['/calendar-view']);
      })
      .catch((e) => {
        this.loading = false;
        this.errorMessage = ERROR_INCORRECT_LOGIN;
      });
  }
}

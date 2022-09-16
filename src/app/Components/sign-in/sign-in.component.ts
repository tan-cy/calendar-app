import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, CognitoService } from '../../Services/cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  user: IUser;
  loading: boolean;
  public errorMessage: string = '';

  constructor(private router: Router, private cognitoService: CognitoService) {
    this.user = {} as IUser;
    this.loading = false;
  }

  ngOnInit(): void {}

  seeError(e: Error): void {
    this.loading = false;
    const error = JSON.parse(JSON.stringify(e));
    this.errorMessage = 'Username or Password is incorrect';
    console.log(error);
  }

  public signIn(): void {
    this.loading = true;
    this.cognitoService
      .signIn(this.user)
      .then(() => {
        this.router.navigate(['/calendar-view']);
      })
      .catch((e) => {
        this.seeError(e);
      });
  }
}

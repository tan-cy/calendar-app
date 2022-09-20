import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CognitoService, IUser } from 'src/app/Services/cognito.service';

@Component({
  selector: 'app-confirm-user',
  templateUrl: './confirm-user.component.html',
  styleUrls: ['./confirm-user.component.css'],
})
export class ConfirmUserComponent implements OnInit {
  loading: boolean;
  user: IUser;
  verificationDestinationEmail?: string;
  error?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cognitoService: CognitoService
  ) {
    this.loading = false;
    this.user = {} as IUser;
    this.error = undefined;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.user = JSON.parse(params['user']);
    });
  }

  private signIn(): void {
    this.loading = true;
    this.cognitoService
      .signIn(this.user)
      .then(() => {
        this.router.navigate(['/calendar-view']);
      })
      .catch((e) => {
        console.error('Error in sign in..');
        console.error(e);
        this.loading = false;
        this.error = e.message;
      });
  }

  public confirmUser(): void {
    this.loading = true;
    this.cognitoService
      .confirmSignUp(this.user)
      .then(() => {
        this.signIn();
      })
      .catch((e) => {
        console.error('Error in confirming user..');
        console.error(e);
        this.loading = false;
        this.error = e.message;
      });
  }

  public resendVerification(): void {
    this.loading = true;
    this.cognitoService
      .resendVerification(this.user)
      .then((res) => {
        console.log(res);
        console.log(res.destination);
        this.error = undefined;
        this.verificationDestinationEmail = res.CodeDeliveryDetails.Destination;
      })
      .catch((e) => {
        console.error('Error in resending verification..');
        console.error(e);
        this.error = e.message;
      });
    this.loading = false;
  }
}

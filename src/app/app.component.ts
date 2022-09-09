import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from './Services/cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'calendar-app';
  constructor(private router: Router, private cognitoService: CognitoService) {}

  public isAuthenticated(): boolean {
    console.log('AUTHENTICATING...');
    console.log(this.cognitoService.isAuthenticated());
    return this.cognitoService.isAuthenticated();
  }

  public signOut(): void {
    this.cognitoService.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }
}

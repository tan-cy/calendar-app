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
  constructor() {}
}

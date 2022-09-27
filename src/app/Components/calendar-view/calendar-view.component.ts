import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/Services/cognito.service';
import { CalendarDate, CalendarView } from 'src/app/Constants/Calendar';
@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
})
export class CalendarViewComponent implements OnInit {
  dateSelected?: CalendarDate;
  view?: CalendarView;
  calendarViews?: CalendarView[];
  CalendarView = CalendarView;
  constructor(private router: Router, private cognitoService: CognitoService) {
    this.calendarViews = Object.values(CalendarView);
  }

  ngOnInit(): void {
    this.confirmUserLoggedIn();
  }

  private confirmUserLoggedIn(): void {
    this.cognitoService.getUser().then((user) => {
      if (!user) {
        this.router.navigate(['/sign-in']);
      } else {
        this.view = CalendarView.MONTH_VIEW;
      }
    });
  }

  public signOut(): void {
    this.cognitoService.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }

  public setView(event: any): void {
    this.view = event.target.value;
    this.dateSelected = undefined;
  }

  public onDateSelected(dateString: string): void {
    this.view = CalendarView.DAY_VIEW;
    this.dateSelected = JSON.parse(dateString);
  }
}

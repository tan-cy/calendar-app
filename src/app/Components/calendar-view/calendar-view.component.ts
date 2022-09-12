import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CalendarDate,
  monthsWithDays,
  weekdays,
} from 'src/app/Constants/Calendar';
import { CognitoService } from 'src/app/Services/cognito.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css'],
})
export class CalendarViewComponent implements OnInit {
  @Input() dateSelected?: CalendarDate;
  public monthsWithDays = monthsWithDays;
  public weekdays = weekdays;
  public year = new Date().getFullYear();

  generateDaysInMonthArray(days: number, month: number): number[][] {
    const firstDayOfMonth = this.getWeekdayForFirstOfMonth(month);
    let daysInMonth = new Array(firstDayOfMonth).fill(null);
    for (let i = 1; i <= days; i++) {
      daysInMonth.push(i);
    }

    return daysInMonth;
  }

  generateDaysInMonthArrays() {
    monthsWithDays.forEach((monthData) => {
      monthData.daysArray = this.generateDaysInMonthArray(
        monthData.day,
        monthData.id
      );
    });
  }

  getWeekdayForFirstOfMonth(month: number) {
    const day = new Date(this.year + '-' + month + '-01').getDay();

    return day;
  }

  public signOut(): void {
    this.cognitoService.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }
  constructor(private router: Router, private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.cognitoService.getUser().then((user) => {
      if (user) {
        this.generateDaysInMonthArrays();
      } else {
        this.router.navigate(['/sign-in']);
      }
    });
  }
}

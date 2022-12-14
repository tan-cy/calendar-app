import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CalendarDate,
  MAX_MONTH_IDX,
  MIN_MONTH_IDX,
  MonthData,
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
  public year = this.getCurrentYear();
  public monthData = this.getCurrentMonth();

  generateDaysInMonthArray(): void {
    const days = this.monthData.day;
    const firstDayOfMonth = this.getWeekdayForFirstOfMonth(this.monthData.id);
    let daysInMonth = new Array(firstDayOfMonth).fill(null);
    for (let i = 1; i <= days; i++) {
      daysInMonth.push(i);
    }

    const daysInLastWeek = daysInMonth.length % 7;
    const numDaysToFillLastWeek =
      daysInLastWeek == 0 ? 0 : 7 - (daysInLastWeek % 7);
    for (let i = 0; i < numDaysToFillLastWeek; i++) {
      daysInMonth.push(null);
    }

    this.monthData.daysArray = daysInMonth;
  }
  getCurrentMonth(): MonthData {
    const d = new Date();
    return monthsWithDays[d.getMonth()];
  }
  getCurrentYear(): number {
    const y = new Date();
    return y.getFullYear();
  }

  getWeekdayForFirstOfMonth(month: number): number {
    const day = new Date(this.year + '-' + month + '-01').getUTCDay();
    return day;
  }

  setPreviousYear(): void {
    if (this.monthData.id === MIN_MONTH_IDX + 1) {
      this.year--;
    }
  }

  setNextYear(): void {
    if (this.monthData.id === MAX_MONTH_IDX + 1) {
      this.year++;
    }
  }

  setPreviousMonth(): void {
    const currentMonthIndex = this.monthData.id - 1;
    let prevMonthIndex;
    if (currentMonthIndex === MIN_MONTH_IDX) {
      prevMonthIndex = MAX_MONTH_IDX;
    } else {
      prevMonthIndex = currentMonthIndex - 1;
    }
    this.monthData = monthsWithDays[prevMonthIndex];
  }
  setNextMonth(): void {
    const currentMonthIndex = this.monthData.id - 1;
    let nextMonthIndex;
    if (currentMonthIndex === MAX_MONTH_IDX) {
      nextMonthIndex = MIN_MONTH_IDX;
    } else {
      nextMonthIndex = currentMonthIndex + 1;
    }
    this.monthData = monthsWithDays[nextMonthIndex];
  }
  backArrowClicked(): void {
    this.setPreviousYear();
    this.setPreviousMonth();
    this.generateDaysInMonthArray();
  }
  nextArrowClicked(): void {
    this.setNextYear();
    this.setNextMonth();
    this.generateDaysInMonthArray();
  }

  public signOut(): void {
    this.cognitoService.signOut().then(() => {
      this.router.navigate(['/sign-in']);
    });
  }
  constructor(private router: Router, private cognitoService: CognitoService) {}

  ngOnInit(): void {
    this.generateDaysInMonthArray();
    this.cognitoService.getUser().then((user) => {
      if (user) {
        this.generateDaysInMonthArray();
      } else {
        this.router.navigate(['/sign-in']);
      }
    });
  }
}

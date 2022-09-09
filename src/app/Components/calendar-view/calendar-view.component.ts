import { Component, Input, OnInit } from '@angular/core';

import {
  CalendarDate,
  monthsWithDays,
  weekdays,
} from 'src/app/Constants/Calendar';

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
  public month = this.getCurrentMonth();

  generateDaysInMonthArray(days: number, month: number): number[][] {
    const firstDayOfMonth = this.getWeekdayForFirstOfMonth(month);
    let daysInMonth = new Array(firstDayOfMonth).fill(null);
    for (let i = 1; i <= days; i++) {
      daysInMonth.push(i);
    }

    return daysInMonth;
  }
  getCurrentMonth() {
    const d = new Date();
    return monthsWithDays[d.getMonth()];
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
    const day = new Date(this.year + '-' + month + '-01').getUTCDay();

    return day;
  }

  setPreviousMonth() {
    const currentMonthIndex = this.month.id - 1;
    this.month = monthsWithDays[currentMonthIndex - 1];
  }
  setNextMonth() {
    const currentMonthIndex = this.month.id - 1;
    this.month = monthsWithDays[currentMonthIndex + 1];
  }
  backArrowClicked() {
    this.setPreviousMonth();
  }
  nextArrowClicked() {
    this.setNextMonth();
  }

  constructor() {}

  ngOnInit(): void {
    this.generateDaysInMonthArrays();
  }
}

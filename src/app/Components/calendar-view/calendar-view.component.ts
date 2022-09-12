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
  public year = this.getCurrentYear();
  public month = this.getCurrentMonth();

  generateDaysInMonthArray(days: number, month: number): number[][] {
    const firstDayOfMonth = this.getWeekdayForFirstOfMonth(month, this.year);
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
  getCurrentYear() {
    const y = new Date();
    return y.getFullYear();
  }

  generateDaysInMonthArrays() {
    monthsWithDays.forEach((monthData) => {
      monthData.daysArray = this.generateDaysInMonthArray(
        monthData.day,
        monthData.id
      );
    });
  }

  getWeekdayForFirstOfMonth(month: number, year: number) {
    const day = new Date(year + '-' + month + '-01').getUTCDay();
    console.log(year);
    return day;
  }

  setPreviousMonth() {
    let currentMonthIndex = this.month.id - 1;
    console.log(currentMonthIndex);
    if (currentMonthIndex === 0) {
      currentMonthIndex = 11;
      this.month = monthsWithDays[currentMonthIndex];
      this.year--;
    } else {
      this.month = monthsWithDays[currentMonthIndex - 1];
    }
  }
  setNextMonth() {
    let currentMonthIndex = this.month.id - 1;
    console.log(currentMonthIndex);

    if (currentMonthIndex === 11) {
      currentMonthIndex = 0;
      this.month = monthsWithDays[currentMonthIndex];
      this.year++;
    } else {
      this.month = monthsWithDays[currentMonthIndex + 1];
    }
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

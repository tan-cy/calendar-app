import { Component, Input, OnInit } from '@angular/core';
import {
  CalendarDate,
  MonthData,
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

  private numberOfWeekdays = 7;

  generateDaysInMonthArray(days: number, month: number): number[][] {
    const firstDayOfMonth = this.getWeekdayFromDate(1, month);
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

  calculateWeekdayFromDate(
    month: number,
    date: number,
    firstTwoNumsOfYear: number,
    lastTwoNumsOfYear: number
  ) {
    return (
      Math.abs(
        Math.round(
          date +
            (13 * month - 1) / 5 +
            lastTwoNumsOfYear +
            lastTwoNumsOfYear / 4 +
            firstTwoNumsOfYear / 4 -
            2 * firstTwoNumsOfYear
        ) % 7
      ) + 1
    );
  }
  getWeekdayFromDate(date: number, month: number) {
    const lastTwoNumsOfYear = parseInt(this.year.toString().substring(2, 4));
    const firstTwoNumsOfYear = parseInt(this.year.toString().substring(0, 2));
    const weekdayIndex = this.calculateWeekdayFromDate(
      month,
      date,
      firstTwoNumsOfYear,
      lastTwoNumsOfYear
    );

    return weekdayIndex;
  }

  constructor() {}

  ngOnInit(): void {
    this.generateDaysInMonthArrays();
  }

  dayClickedHandler() {}
}

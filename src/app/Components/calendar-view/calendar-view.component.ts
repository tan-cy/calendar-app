import { Component, Input, OnInit } from '@angular/core';
import { first, last } from 'rxjs';
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
  monthsWithDays = monthsWithDays;
  weekdays = weekdays;

  private numberOfRows = 7;
  private numberOfColumns = 5;

  getWeekdayFromDate(date: number, year: number, month: number) {
    const lastTwoNumsOfYear = parseInt(year.toString().substring(2, 4));
    const firstTwoNumsOfYear = parseInt(year.toString().substring(2));
    const weekdayIndex =
      (date +
        (13 * month - 1) / 5 +
        lastTwoNumsOfYear +
        lastTwoNumsOfYear / 4 +
        firstTwoNumsOfYear / 4 -
        2 * firstTwoNumsOfYear) %
      7;
    return weekdayIndex;
  }

  constructor() {}

  ngOnInit(): void {}

  dayClickedHandler() {
    console.log();
  }
}

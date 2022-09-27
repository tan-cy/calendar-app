import { Component, Input, OnInit } from '@angular/core';
import {
  CalendarDate,
  MONTHS_WITH_DAYS,
  WEEKDAYS,
} from 'src/app/Constants/Calendar';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css'],
})
export class DayViewComponent implements OnInit {
  @Input() date?: CalendarDate;
  shortDate?: string;
  constructor() {}

  ngOnInit(): void {
    this.getDate();
  }

  private getDate(): void {
    if (!this.date) {
      const today = new Date();
      this.date = {
        weekday: WEEKDAYS[today.getDay()].day,
        month: MONTHS_WITH_DAYS[today.getMonth()].month,
        monthId: today.getMonth() + 1,
        day: today.getDate(),
        year: today.getFullYear(),
      };
    }
    this.shortDate =
      this.date.monthId.toString().padStart(2, '0') +
      '/' +
      this.date.day.toString().padStart(2, '0') +
      '/' +
      this.date.year.toString().substring(2);
  }

  public backArrowClicked(): void {}

  public nextArrowClicked(): void {}
}

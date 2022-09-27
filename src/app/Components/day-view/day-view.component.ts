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
        day: today.getDate(),
        year: today.getFullYear(),
      };
    }
    console.log(this.date);
  }

  public backArrowClicked(): void {}

  public nextArrowClicked(): void {}
}

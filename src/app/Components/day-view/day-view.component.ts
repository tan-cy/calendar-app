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
      this.setToday();
    }
    this.setShortDate();
  }

  private setToday(date = new Date()): void {
    const today = date;
    this.date = {
      weekday: WEEKDAYS[today.getDay()],
      month: MONTHS_WITH_DAYS[today.getMonth()],
      day: today.getDate(),
      year: today.getFullYear(),
    };
  }

  private setShortDate(): void {
    if (this.date) {
      this.shortDate =
        this.date.month.id.toString().padStart(2, '0') +
        '/' +
        this.date.day.toString().padStart(2, '0') +
        '/' +
        this.date.year.toString().substring(2);
    }
  }

  private getDay(): Date {
    return new Date(this.shortDate!);
  }

  public backArrowClicked(): void {
    if (this.date) {
      let today = this.getDay();
      today.setDate(today.getDate() - 1);
      this.setToday(today);
      this.setShortDate();
    }
  }

  public nextArrowClicked(): void {
    if (this.date) {
      let today = this.getDay();
      today.setDate(today.getDate() + 1);
      this.setToday(today);
      this.setShortDate();
    }
  }
}

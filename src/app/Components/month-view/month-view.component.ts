import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  MAX_MONTH_IDX,
  MIN_MONTH_IDX,
  MonthData,
  MONTHS_WITH_DAYS,
  WEEKDAYS,
} from 'src/app/Constants/Calendar';

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css'],
})
export class MonthViewComponent implements OnInit {
  @Output() dateSelected = new EventEmitter<string>();
  public year = this.getCurrentYear();
  public monthData = this.getCurrentMonth();
  public weekdays = WEEKDAYS;

  constructor() {}

  ngOnInit(): void {
    this.generateDaysInMonthArray();
  }

  generateDaysInMonthArray(): void {
    const days = this.monthData.day;
    const firstDayOfMonth = this.getWeekdayIdForDay(this.monthData.id);
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
    return MONTHS_WITH_DAYS[d.getMonth()];
  }
  getCurrentYear(): number {
    const y = new Date();
    return y.getFullYear();
  }

  getWeekdayIdForDay(month: number, date = 1): number {
    const day = new Date(this.year + '-' + month + '-' + date).getUTCDay();
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
    this.monthData = MONTHS_WITH_DAYS[prevMonthIndex];
  }
  setNextMonth(): void {
    const currentMonthIndex = this.monthData.id - 1;
    let nextMonthIndex;
    if (currentMonthIndex === MAX_MONTH_IDX) {
      nextMonthIndex = MIN_MONTH_IDX;
    } else {
      nextMonthIndex = currentMonthIndex + 1;
    }
    this.monthData = MONTHS_WITH_DAYS[nextMonthIndex];
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

  goToDay(day: number): void {
    const date = {
      weekday: WEEKDAYS[this.getWeekdayIdForDay(this.monthData.id, day)].day,
      month: this.monthData.month,
      monthId: this.monthData.id,
      day: day,
      year: this.year,
    };
    this.dateSelected.emit(JSON.stringify(date));
  }
}

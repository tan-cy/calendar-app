import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
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

  constructor() {}

  ngOnInit(): void {
    this.generateDaysInMonthArrays();
  }

  dayClickedHandler() {}
}

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
  monthsWithDays: MonthData[];
  weekdays: string[];

  constructor() {
    this.monthsWithDays = monthsWithDays;
    this.weekdays = weekdays;
  }

  ngOnInit(): void {}

  dayClickedHandler() {
    console.log();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/schedule.service';
import {
  EventToSchedule,
  defaultEventToSchedule,
} from 'src/app/Constants/ScheduleEvents';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.css'],
})
export class ScheduleDayComponent implements OnInit {
  @Input() eventToSchedule!: EventToSchedule;

  constructor(public scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.eventToSchedule = defaultEventToSchedule;
  }

  check() {
    console.log(this.eventToSchedule?.title);
  }
}

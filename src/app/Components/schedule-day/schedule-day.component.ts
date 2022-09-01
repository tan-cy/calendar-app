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
  @Input() eventToSchedule?: EventToSchedule;

  constructor(public scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.eventToSchedule = defaultEventToSchedule;
  }

  onScheduleHandler() {
    if (this.eventToSchedule !== undefined) {
      if (!this.eventToSchedule.date) {
        console.log('can not leave date undefined');
      }
      if (!this.eventToSchedule.title) {
        console.log('can not leave title undefined');
      }
      if (!this.eventToSchedule.time) {
        console.log('can not leave time undefined');
      }
      if (!this.eventToSchedule.location) {
        this.eventToSchedule.location = 'N/A';
      }
      if (!this.eventToSchedule.description) {
        this.eventToSchedule.description = 'N/A';
      }
    }

    console.log(this.eventToSchedule?.title);
    console.log(this.eventToSchedule?.time);
    console.log(this.eventToSchedule?.date);
    console.log(this.eventToSchedule?.description);
  }
}

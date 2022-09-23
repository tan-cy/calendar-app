import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/Services/schedule.service';
import {
  CalendarEvent,
  defaultEventToSchedule,
  NO_ERRORS,
  ERROR_EVENT_EMPTY,
  ERROR_EMPTY_DATE,
  ERROR_EMPTY_TIME,
  ERROR_EMPTY_TITLE,
  ERROR_SUBMIT_FAILED,
} from 'src/app/Constants/ScheduleEvents';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-day',
  templateUrl: './schedule-day.component.html',
  styleUrls: ['./schedule-day.component.css'],
})
export class ScheduleDayComponent implements OnInit {
  errors?: string;
  eventToSchedule: CalendarEvent;

  constructor(public router: Router, public scheduleService: ScheduleService) {
    this.eventToSchedule = defaultEventToSchedule;
  }

  ngOnInit(): void {
    this.eventToScheduleClearDetails();
    this.eventToScheduleDatetimeInit();
  }

  eventToScheduleDatetimeInit(): void {
    const today = new Date();
    this.eventToSchedule.date = today.toISOString().slice(0, 10);
    this.eventToSchedule.time = today.toTimeString().slice(0, 5);
    this.eventToSchedule.timezoneOffset = today.getTimezoneOffset();
  }

  eventToScheduleClearDetails(): void {
    this.eventToSchedule.title = '';
    this.eventToSchedule.location = '';
    this.eventToSchedule.description = '';
  }

  onCancelHandler(): void {
    this.router.navigate(['/calendar-view']);
  }

  /**
   * returns true if errors exists, false otherwise
   */
  checkForErrors(): void {
    if (this.eventToSchedule === undefined) {
      console.error(ERROR_EVENT_EMPTY);
      this.displayErrors(ERROR_EVENT_EMPTY);
    } else if (!this.eventToSchedule.date) {
      console.error(ERROR_EMPTY_DATE);
      this.displayErrors(ERROR_EMPTY_DATE);
    } else if (!this.eventToSchedule.title) {
      console.error(ERROR_EMPTY_TITLE);
      this.displayErrors(ERROR_EMPTY_TITLE);
    } else if (!this.eventToSchedule.time) {
      console.error(ERROR_EMPTY_TIME);
      this.displayErrors(ERROR_EMPTY_TIME);
    } else {
      this.displayErrors(undefined);
    }
  }

  displayErrors(errors?: string): void {
    this.errors = errors;
  }

  private setEventId(): void {
    this.eventToSchedule.id = new Date(
      this.eventToSchedule.date + ' ' + this.eventToSchedule.time
    ).valueOf();
  }

  private async handleSubmitEvent(): Promise<void> {
    this.setEventId();
    const success = await this.scheduleService.submitEvent(
      this.eventToSchedule
    );
    if (success) {
      this.router.navigate(['/calendar-view']);
    } else {
      this.displayErrors(ERROR_SUBMIT_FAILED);
    }
  }

  onScheduleHandler(): void {
    this.checkForErrors();
    if (!this.errors) {
      this.handleSubmitEvent();
    }
  }
}

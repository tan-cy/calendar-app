import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'src/app/Constants/ScheduleEvents';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css'],
})
export class EventViewComponent implements OnInit {
  events: CalendarEvent[];
  constructor() {
    this.events = [];
  }

  ngOnInit(): void {}
}

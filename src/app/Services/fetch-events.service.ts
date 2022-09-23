import { Injectable } from '@angular/core';
import { CalendarEvent } from '../Constants/ScheduleEvents';

@Injectable({
  providedIn: 'root',
})
export class FetchEventsService {
  constructor() {}

  public getEvent(): CalendarEvent {
    return {
      id: 0,
      title: 'TestEvent',
      date: '09-21-2022',
      time: '19:20',
      location: '',
      description: '',
      timezoneOffset: 0,
    };
  }

  public getEventsForDay(date: string): CalendarEvent[] {
    let events = new Array();
    const numEvents = new Date(date).getDate() % 8;
    for (let i = 0; i < numEvents; i++) {
      events.push(this.getEvent());
    }
    return events;
  }
}

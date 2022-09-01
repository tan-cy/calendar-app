import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor() {}

  submitEvent() {
    console.log('works');
  }
}

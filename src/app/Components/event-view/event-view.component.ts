import { Component, OnInit, Input, HostListener } from '@angular/core';
import { CalendarEvent } from 'src/app/Constants/ScheduleEvents';
import { FetchEventsService } from 'src/app/Services/fetch-events.service';
@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css'],
})
export class EventViewComponent implements OnInit {
  events: CalendarEvent[] = [];
  maxEvents: number = 0;
  @Input() numWeeks: number = 0;
  @Input() month?: string;
  @Input() date?: string;
  @Input() year?: string;

  constructor(private fetchEventsService: FetchEventsService) {}

  ngOnInit(): void {
    console.log(this.numWeeks);
  }

  ngOnChanges(): void {
    this.setMaxEventsToDisplay();
    this.fetchEventsForDay();
  }

  private getMaxEvents(): number {
    const width = window.innerHeight;
    if (width < 496) {
      return 0;
    } else if (width >= 496 && width < 596) {
      return 1;
    } else if (width >= 596 && width < 780) {
      return 2;
    } else if (width >= 780 && width < 1200) {
      return 3;
    } else if (width >= 1200 && width < 1600) {
      return 4;
    } else {
      return 5;
    }
  }

  private setMaxEventsToDisplay(): void {
    this.maxEvents = this.getMaxEvents();
    if (this.numWeeks > 5 && this.events.length > 0) {
      this.maxEvents -= 1;
    }
  }

  public fetchEventsForDay(): void {
    if (this.date) {
      const day = this.month + '-' + this.date + '-' + this.year;
      this.events = this.fetchEventsService.getEventsForDay(day);
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setMaxEventsToDisplay();
  }
}

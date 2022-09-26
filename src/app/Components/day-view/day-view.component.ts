import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day-view',
  templateUrl: './day-view.component.html',
  styleUrls: ['./day-view.component.css'],
})
export class DayViewComponent implements OnInit {
  @Input() date?: string;
  constructor() {}

  ngOnInit(): void {
    this.getDate();
  }

  private getDate(): void {
    if (!this.date) {
      this.date = new Date().toISOString().slice(0, 10);
    }
    console.log('date', this.date);
  }
}

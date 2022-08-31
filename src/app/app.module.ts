import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalendarViewComponent } from './Components/calendar-view/calendar-view.component';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleDayComponent } from './Components/schedule-day/schedule-day.component';

@NgModule({
  declarations: [AppComponent, CalendarViewComponent, ScheduleDayComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

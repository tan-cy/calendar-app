import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CalendarViewComponent } from './Components/calendar-view/calendar-view.component';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleDayComponent } from './Components/schedule-day/schedule-day.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmUserComponent } from './Components/confirm-user/confirm-user.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { EventViewComponent } from './Components/event-view/event-view.component';
import { MonthViewComponent } from './Components/month-view/month-view.component';
import { DayViewComponent } from './Components/day-view/day-view.component';
import { WeekViewComponent } from './Components/week-view/week-view.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarViewComponent,
    ScheduleDayComponent,
    ConfirmUserComponent,
    SignInComponent,
    SignUpComponent,
    EventViewComponent,
    MonthViewComponent,
    DayViewComponent,
    WeekViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

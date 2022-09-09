import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarViewComponent } from './Components/calendar-view/calendar-view.component';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleDayComponent } from './Components/schedule-day/schedule-day.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';

@NgModule({
  declarations: [AppComponent, CalendarViewComponent, ScheduleDayComponent, SignUpComponent, SignInComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

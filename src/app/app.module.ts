import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CalendarViewComponent } from './Components/calendar-view/calendar-view.component';
import { AppRoutingModule } from './app-routing.module';
import { ScheduleDayComponent } from './Components/schedule-day/schedule-day.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { ConfirmUserComponent } from './Components/confirm-user/confirm-user.component';
import { ErrorComponent } from './Components/error/error.component';

@NgModule({
  declarations: [AppComponent, CalendarViewComponent, ScheduleDayComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

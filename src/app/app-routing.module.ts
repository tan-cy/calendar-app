import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarViewComponent } from './Components/calendar-view/calendar-view.component';
import { ConfirmUserComponent } from './Components/confirm-user/confirm-user.component';
import { DayViewComponent } from './Components/day-view/day-view.component';
import { ScheduleDayComponent } from './Components/schedule-day/schedule-day.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'calendar-view', pathMatch: 'full' },
  { path: 'calendar-view', component: CalendarViewComponent },
  { path: 'day-view', component: DayViewComponent },
  { path: 'schedule-day', component: ScheduleDayComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'confirm-user', component: ConfirmUserComponent },
  { path: '**', redirectTo: 'error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

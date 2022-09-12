import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarViewComponent } from './Components/calendar-view/calendar-view.component';
import { ScheduleDayComponent } from './Components/schedule-day/schedule-day.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'calendar-view', pathMatch: 'full' },
  { path: 'calendar-view', component: CalendarViewComponent },
  { path: 'schedule-day', component: ScheduleDayComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', redirectTo: 'calendar-view' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

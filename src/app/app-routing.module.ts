import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarViewComponent } from './Components/calendar-view/calendar-view.component';
import { ScheduleDayComponent } from './Components/schedule-day/schedule-day.component';

const routes: Routes = [
  { path: '', redirectTo: '/calendar-view', pathMatch: 'full' },
  { path: 'calendar-view', component: CalendarViewComponent },
  { path: 'schedule-day', component: ScheduleDayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

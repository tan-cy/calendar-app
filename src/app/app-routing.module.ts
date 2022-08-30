import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarViewComponent } from './Components/calendar-view/calendar-view.component';
const routes: Routes = [
  { path: 'calendar-view', component: CalendarViewComponent },
  { path: '', redirectTo: '/calendar-view', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

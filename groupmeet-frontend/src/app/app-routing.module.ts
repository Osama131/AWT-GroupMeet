import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsManagementComponent } from './groups-management/groups-management.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'groups', component: GroupsManagementComponent },
  { path: 'calender', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

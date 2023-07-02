import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsManagementComponent } from './groups-management/groups-management.component';
import { CalendarComponent } from './calendar/calendar.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '', component: LoginSignupComponent},
  { path: 'groups', component: GroupsManagementComponent },
  { path: 'calender', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

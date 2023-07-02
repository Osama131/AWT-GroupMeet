import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsManagementComponent } from './homescreen/groups-management/groups-management.component';
import { CalendarComponent } from './homescreen/calendar/calendar.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginSignupComponent },
  { path: 'home' , component: NavigationTabsComponent},
  { path: 'groups', component: GroupsManagementComponent },
  { path: 'calender', component: CalendarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

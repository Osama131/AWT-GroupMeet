import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsManagementComponent } from './homescreen/groups-management/groups-management.component';
import { CalendarComponent } from './homescreen/calendar/calendar.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';

const routes: Routes = [
  { path: 'login', component: LoginSignupComponent },
  { path: 'home', redirectTo: '/groups', pathMatch: 'full' },
  // { path: 'home', component: SidenavComponent },
  { path: 'groups', component: GroupsManagementComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: '', redirectTo: '/groups', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

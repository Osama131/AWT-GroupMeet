import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupsManagementComponent } from './groups-management/groups-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'groups', component: GroupsManagementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';

// import { MatTabsModule } from '@angular/material/tabs';

import { HomescreenModule } from '../homescreen/homescreen.module';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

// import { GroupsManagementComponent } from '../homescreen/groups-management/groups-management.component';
// import { GroupsManagementComponent } from '../groups-management/groups-management.component';
// import { CalendarComponent } from '../calendar/calendar.component';


@Component({
  selector: 'app-navigation-tabs',
  templateUrl: './navigation-tabs.component.html',
  styleUrls: ['./navigation-tabs.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatTabsModule,
    MatSidenavModule,
    HomescreenModule,
    MatListModule,
    // GroupsManagementComponent,
    // CalendarComponent
  ],

})


export class NavigationTabsComponent {

}

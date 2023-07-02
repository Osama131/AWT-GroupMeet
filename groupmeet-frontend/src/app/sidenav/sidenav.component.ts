import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from '../app-routing.module';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  standalone: true,

  imports: [
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    NgForOf
  ],
})

export class SidenavComponent {
  links: { label: string; route: string }[] = [
    { label: 'Groups', route: 'groups' },
    { label: 'Calendar', route: 'calendar' }
  ];
}

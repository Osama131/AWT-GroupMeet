import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GroupsManagementComponent } from './groups-management/groups-management.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Component, signal, ChangeDetectorRef } from '@angular/core';

@NgModule({
    declarations: [
        GroupsManagementComponent,
        CalendarComponent,

    ],
    imports: [
        FormsModule,
        HttpClientModule,
        FullCalendarModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        CommonModule,


    ],
    providers: [],
    bootstrap: [GroupsManagementComponent, CalendarComponent],
    exports: [GroupsManagementComponent, CalendarComponent]
})


export class HomescreenModule { }

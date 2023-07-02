import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { HeaderComponent } from './header/header.component';
import { GroupsManagementComponent } from './groups-management/groups-management.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    // LoginSignupComponent,
    // HeaderComponent,
    GroupsManagementComponent,
    CalendarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    LoginSignupComponent,
    HeaderComponent
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

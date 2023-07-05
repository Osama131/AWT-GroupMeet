import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authenticate/login/login.component';
import { HeaderComponent } from './header/header.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HomescreenModule } from './homescreen/homescreen.module';
import { NavigationTabsComponent } from './navigation-tabs/navigation-tabs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    // SidenavComponent,
    // SidenavComponent,
    // LoginSignupComponent,
    // HeaderComponent,
    // GroupsManagementComponent,
    // CalendarComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FullCalendarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    LoginComponent,
    HeaderComponent,
    HomescreenModule,
    NavigationTabsComponent,
    MatSidenavModule,
    SidenavComponent


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') != null && localStorage.getItem('isLoggedIn') == 'true';
  }
}

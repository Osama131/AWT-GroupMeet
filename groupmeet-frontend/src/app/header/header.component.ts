import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false; // Set the initial value based on user login status

  constructor(private router: Router) { }

  goToHomePage() {
    this.router.navigate(['/']); // Navigate to the home page
  }

  signOut() {
    // Perform sign out logic
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {
  username: string;
  password: string;

  constructor() {
    this.username = ''; // Initial value for username
    this.password = ''; // Initial value for password
  }
  
  login() {
    // Handle login logic here
    console.log('Login button clicked');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

  signup() {
    // Handle signup logic here
    console.log('Signup button clicked');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }
}

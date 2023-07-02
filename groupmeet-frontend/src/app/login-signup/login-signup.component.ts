import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators ,  FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatDividerModule
  ],
})
export class LoginSignupComponent {
  username: string;
  password: string;
  usernameInput: FormControl;

  constructor() {
    this.username = ''; // Initial value for username
    this.password = ''; // Initial value for password
    this.usernameInput = new FormControl('', [Validators.required]);
  }

  login() {
    // Handle login logic here
    console.log('Login button clicked');
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Do not allow empty username or password
    if (this.username.trim() === '' || this.password.trim() === '') {
      alert('Username or password cannot be empty');
      return;
    }

    // Redirect to the home page for now
    window.location.href = '/home';
  }

  signup() {
    // Handle signup logic here
    console.log('Signup button clicked');
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    // Redirect to the home page for now
    window.location.href = '/home';
  }
}

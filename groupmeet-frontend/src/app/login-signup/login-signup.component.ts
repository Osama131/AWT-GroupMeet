import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { requestType, LoginData, AuthenticateService } from '../services/authenticate.service';
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';



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
    MatDividerModule,
    MatSnackBarModule
  ],
})


export class LoginSignupComponent {

  constructor(private service: AuthenticateService , private router:Router, private snackBar: MatSnackBar) { }

  login(event: Event, form: NgForm) {
    event.preventDefault();
    this.dataValidation(form.value, requestType.LOGIN);
    // Handle login logic here
    var res = this.service.login(form.value);
    if (res) {
      this.router.navigate(['/home']);
    }else{
      this.snackBar.open("Invalid Credentials", "Dismiss");
    }
  }

  signup(event: Event, form: NgForm) {

    event.preventDefault();

    // Handle signup logic here
    console.log('Signup button clicked');
    console.log('Username:', form.value.username);
    console.log('Password:', form.value.password);

    // console.log(process.env.API_URL);
    console.log("API", environment.API_URL);

    // Redirect to the home page for now
    // window.location.href = '/home';
  }

  dataValidation(data: LoginData, request: requestType) {
    //validates the data

    //if the data is valid, call formHandler
    this.formHandler(data, request);


  }

  formHandler(data: LoginData, request: requestType) {
    //sends the data to the backend
  }
}

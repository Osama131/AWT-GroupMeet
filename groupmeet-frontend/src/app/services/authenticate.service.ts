import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgForm } from '@angular/forms';

export enum requestType {
  LOGIN,
  SIGNUP
}

export interface LoginData {
  username?: string;
  email?: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  apiurl: string = environment.API_URL;
  loginPath: string = "/login";

  constructor(private http: HttpClient) { }

  login(UserCred: any): boolean {

    this.http.post(this.apiurl + this.loginPath, UserCred).subscribe((res: any) => {
      if (res.status == 200) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('isLoggedIn', 'true');
      }
      else { localStorage.setItem('isLoggedIn', 'false'); }
    })
    return this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') != null;
  }
}

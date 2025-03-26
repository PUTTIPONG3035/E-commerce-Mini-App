import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  standalone: false,

  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
  disableLogin: boolean = false;
  disableSignup: boolean = true;
  email: string = "";
  password: string = "";

  //Create User
  emailCreate: string = "";
  passwordCreate: string = "";
  nameCreate: string = "";
  contactCreate: string = "";
  statusCreate: string = "";
  roleCreate: string = "";


  constructor(private http: HttpClient,  private router: Router) {

  }


  NotHaveAccount() {
    this.disableLogin = true;
    this.disableSignup = false;
    this.email = "";
    this.password = "";
  }
  HaveAccount() {
    this.disableLogin = false;
    this.disableSignup = true;
  }

  async generateSHA256(input: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('');
  }
  
  // Usage


  Login() {
    console.log("Username : " + this.email);
    console.log("Password : " + this.password);

    const loginData = {
      email: this.email,
      password: this.password
    };

    // Send a POST request to your backend API
    this.http.post('http://localhost:5027/login', loginData).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        if (response && response.token) {
          const expiryTime = 24 * 60 * 60 * 1000;  // 1 day in milliseconds
          const expiryTimestamp = new Date().getTime() + expiryTime;

          // Store token and expiry time in localStorage
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('tokenExpiry', expiryTimestamp.toString());
          this.router.navigate(['/']);
        }
        // Handle successful login, store the token, or redirect
      },
      (error) => {
        console.error('Login failed', error);
        // Handle error (show error message to user)
      }
    );
  }

  Signup() {
    const signupData = {
      email: this.emailCreate,
      password: this.passwordCreate,
      name: this.nameCreate,
      contactNumber: this.contactCreate,
      status: this.statusCreate,
      role: this.roleCreate
    };

    if(signupData.email == "" || signupData.password == "" || signupData.name == "" || signupData.contactNumber == "" || signupData.status == "" || signupData.role == ""){
      alert("Please fill all the fields");
    }

    this.http.post('http://localhost:5027/signup', signupData).subscribe(
      (response: any) => {
        console.log('Signup successful', response);
        // Handle successful signup, store the token, or redirect
        this.HaveAccount();
        
      },
      (error) => {
        console.error('Signup failed', error);
        // Handle error (show error message to user)
      }
    );
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-login-signup',
  standalone: false,
  
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
   disableLogin : boolean = false;
   disableSignup : boolean = false;
}

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  standalone: false,
  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  username : string | undefined ;
  contact : string | undefined ;
  email : string | undefined ;
  profileDetails: any;

  token = localStorage.getItem('authToken')

  constructor(private route: ActivatedRoute,private router: Router, private httpClient: HttpClient) {
       
  }

  ngOnInit() {
    if (this.token) {
      const decoded = jwtDecode<{ email: string; role: string }>(this.token);
      console.log(decoded); // ข้อมูลที่ได้จาก token
      this.email = decoded.email;
      this.route.paramMap.subscribe(params => { 
        let apiUrl = 'http://localhost:5027/user/'+ this.email;
        this.httpClient.get(apiUrl).subscribe((data) => {
          this.profileDetails = data;
          console.log(this.profileDetails);
        });
      });
    }
  }


  logout(){
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    this.router.navigate(['/login']);
  }

}

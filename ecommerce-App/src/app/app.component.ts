import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce-App';
  showNavbar : boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      // กำหนด route ที่ต้องการซ่อน navbar
      const hiddenRoutes = ['/login'];
      this.showNavbar = !hiddenRoutes.includes(this.router.url);
    });
  }

}

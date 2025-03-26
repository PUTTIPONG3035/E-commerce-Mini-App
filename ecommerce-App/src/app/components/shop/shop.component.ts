import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-shop',
  standalone: false,

  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  httpClient = inject(HttpClient);
  productsData = {
    productId: 0,
    productName: '',
    Price: 0,
    date: '',
    rating: 0,
    productImage: ''
  }

  productDetails: any;
  token = localStorage.getItem('authToken');

  headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json' // ถ้าเป็น POST ต้องมี
  });

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  ngOnInit() {
    let apiUrl = 'http://localhost:5027/product';
    this.httpClient.get(apiUrl, {headers : this.headers}).subscribe((data) => {
      this.productDetails = data;
      console.log(this.productDetails);
    });
  }

}

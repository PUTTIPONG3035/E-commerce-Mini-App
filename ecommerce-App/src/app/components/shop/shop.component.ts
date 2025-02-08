import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

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

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  ngOnInit() {
    let apiUrl = 'http://localhost:5027/product';
    this.httpClient.get(apiUrl).subscribe((data) => {
      this.productDetails = data;
      console.log(this.productDetails);
    });
  }

}

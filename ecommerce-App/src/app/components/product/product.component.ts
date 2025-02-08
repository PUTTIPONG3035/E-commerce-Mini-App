import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';


@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  httpClient = inject(HttpClient);
  productDetails: any;
  productId: number | null = null;
  quantity: number = 1;

  constructor(private route: ActivatedRoute, private cartService: CartService) {}

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = Number(params.get('id')); // แปลงค่าให้เป็นตัวเลข
      let apiUrl = 'http://localhost:5027/product/'+this.productId;
      this.httpClient.get(apiUrl).subscribe((data) => {
        this.productDetails = data;
        console.log(this.productDetails);
      });
    });
  }

  decreaseQuantity(){
    this.quantity -= 1;
  }

  increaseQuantity(){
    this.quantity += 1;
  }

  addToCart(quantity: number) {
    this.cartService.addToCart(this.productDetails, quantity);
    alert('Added to Cart!');
  }
 
}

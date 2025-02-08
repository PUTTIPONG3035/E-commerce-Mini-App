import { Component } from '@angular/core';
import { CartService } from '../product/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  cartItems : any = [];
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartItems = this.cartService.getCart(); 
  }

  increaseQuantity(id: number) {
    this.cartService.increaseQuantity(id);
    this.cartItems = this.cartService.getCart();
  }

  decreaseQuantity(id: number) {
    this.cartService.decreaseQuantity(id);
    this.cartItems = this.cartService.getCart();
  }

  clearCart(id : number) {
    this.cartService.clearCart(id);
    this.cartItems = this.cartService.getCart();
  }

}

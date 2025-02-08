import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = [];

  constructor() {
    this.loadCart();
  }

  addToCart(product: any, quantity: number) {
    product = {...product, quantity: quantity};
    //เช็คว่ามีการซ้ำกันของ productId หรือไม่
    const cartItem = this.cart.find(cart => cart.productId === product.productId);
    console.log(cartItem);
    if(cartItem) {
        cartItem.quantity += 1;
    } 
    else{
        this.cart.push(product);
    }
    this.saveCart();
    console.log('Cart Updated:', this.cart);
  }

  getCart() {
    return this.cart;
  }

  clearCart(id: number) {
    this.cart = this.cart.filter(product => product.productId !== id);
    console.log(this.cart)
    this.saveCart();
  }

  increaseQuantity(id: number) {
    const product = this.cart.find(product => product.productId === id);
    if (product) {
      product.quantity = product.quantity + 1;
    }
    this.saveCart();
  }

  decreaseQuantity(id: number) {
    const product = this.cart.find(product => product.productId === id);
    if (product) {
      product.quantity = product.quantity - 1;
    }
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart)); 
  }

  private loadCart() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cart = JSON.parse(cartData);
    }
  }
}

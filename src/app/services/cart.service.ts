import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

const STORAGE_KEY = 'my-app-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  cart$ = this.cartSubject.asObservable();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.cartItems = JSON.parse(saved);
        this.cartSubject.next(this.cartItems);
      }
    }
  }

  private updateCart() {
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cartItems));
    }
    this.cartSubject.next(this.cartItems);
  }

  addToCart(product: CartItem) {
    const existing = this.cartItems.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.updateCart();
  }

  increaseQuantity(id: number) {
    const item = this.cartItems.find((i) => i.id === id);
    if (item) {
      item.quantity++;
      this.updateCart();
    }
  }

  decreaseQuantity(id: number) {
    const item = this.cartItems.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    } else {
      this.removeItem(id);
    }
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    this.updateCart();
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
  }
}

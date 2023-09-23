import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
cartSubject : BehaviorSubject<number>


  constructor(private http:HttpClient) { 
    this.cartSubject = new BehaviorSubject<number>(this.getProductsInCart().length)
  }

  fetchAllProducts(){
    return this.http.get<Product[]>('/assets/products.json')
  }

  getProductsInCart(): Product[] {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }

  addProductToCart(product:Product) {
    const productsInCart = this.getProductsInCart();
    productsInCart.push(product);
    this.saveCartItemToLocalStorage(productsInCart);
  }

  saveCartItemToLocalStorage(products: Product[]) {
    localStorage.setItem('cartItems', JSON.stringify(products));
    this.setCartSubjectvalue();
  }

  setCartSubjectvalue() {
    const cartCount = this.getProductsInCart().length;
    this.cartSubject.next(cartCount);
  }

  deleteProductFromCart(id: number) {
    const productsInCart = this.getProductsInCart();
    const index = productsInCart.findIndex((product: any) => product.id === id);
    productsInCart.splice(index, 1);
    this.saveCartItemToLocalStorage(productsInCart);
  }

  
  placeOrder(): void {
    localStorage.clear();
    this.cartSubject.next(0);
  }

}

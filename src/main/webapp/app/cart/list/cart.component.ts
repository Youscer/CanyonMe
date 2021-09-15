import { IProduct } from './../../entities/product/product.model';
import { Component, OnInit } from '@angular/core';
import { Product } from 'app/product/product.model';
import { ICart, Cart } from './../cart.model';
import { CartService } from './../services/cart.service';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: ICart;
  isLoading = false;

  constructor(public cartService: CartService) {
    this.cart = new Cart();
  }

  ngOnInit(): void {
    this.refreshCart();
  }

  refreshCart(): void {
    this.isLoading = true;
    this.cartService.refreshCartProducts().subscribe(() => {
      this.cart = this.cartService.getCart();
      this.isLoading = false;
    });
  }

  addQuantity(product : Product, quantity: number): void{
    this.cartService.addProduct(product, quantity);
  }

  deleteItem(product : Product): void{
    this.cartService.deleteProduct(product.id);
  }
}

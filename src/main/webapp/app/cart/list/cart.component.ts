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
    this.cartService.getCart().addProduct( new Product(1, 'test', 'test', 234), 3 );
  }

  refreshCart(): void {
    this.isLoading = true;
    this.cartService.refreshCartProducts().subscribe(
      () => {
        this.cart = this.cartService.getCart();
        this.isLoading = false;
      }
    );
  }

  addQuantity(product : Product, quantity: number): void{
    this.cart.addProduct(product, quantity);
  }

  deleteItem(product : Product): void{
    this.cart.deleteProduct(product.id);
  }

}

import { Component, OnInit } from '@angular/core';
import { ICart } from './../cart.model';
import { CartService } from './../services/cart.service';


@Component({
  selector: 'canyonme-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart?: ICart;

  constructor(public cartService: CartService) {
    
  }

  ngOnInit(): void {
    this.refreshCart();
  }

  refreshCart(): void {
    this.cartService.refreshCartProducts();
    this.cart = this.cartService.getCart();
  }

}

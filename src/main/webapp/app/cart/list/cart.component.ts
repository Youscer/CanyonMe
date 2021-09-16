import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'app/product/product.model';
import { Cart, ICart, ICartItem } from './../cart.model';
import { CartService } from './../services/cart.service';

@Component({
  selector: 'jhi-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: ICart;
  isLoading = false;

  constructor(public cartService: CartService, private snackBar: MatSnackBar) {
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

  deleteItem(item : ICartItem): void{
    const snackBarRef = this.snackBar.open(item.product.name + ' deleted.', 'Undo', {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      this.cartService.addProduct(item.product, item.quantity);
    });
    this.cartService.deleteProduct(item.product.id);
  }

  deleteCart(): void{
    const tempCart: Cart = new Cart();
    Object.assign(tempCart, this.cart);
    const snackBarRef = this.snackBar.open('Your cart has been deleted.', 'Undo', {
      duration: 5000
    });
    snackBarRef.onAction().subscribe(() => {
      for(const item of tempCart.items){
        this.cartService.addProduct(item.product, item.quantity);
      }
    });
    this.cart = this.cartService.deleteAllCart();
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }
}

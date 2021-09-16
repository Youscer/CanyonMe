import { ConfirmAddCartComponent } from './confirm-add-cart/confirm-add-cart.component';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from 'app/cart/services/cart.service';
import { Product } from 'app/product/product.model';

@Component({
  selector: 'jhi-button-add-cart',
  templateUrl: './button-add-cart.component.html',
  styleUrls: ['./button-add-cart.component.scss'],
})
export class ButtonAddCartComponent {
  @Input() product! : Product;
  durationInSeconds = 3;
  durationConversion = 1000;

  constructor(private snackBar: MatSnackBar, private cartService: CartService) {}

  addCart(): void {
    this.cartService.addProduct(this.product);
    this.snackBar.openFromComponent(ConfirmAddCartComponent, {
      duration: this.durationInSeconds * this.durationConversion,
    });
  }
}

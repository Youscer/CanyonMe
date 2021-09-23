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
  @Input() product!: Product;
  @Input() disabled: boolean = false;
  durationInSeconds = 3;
  durationConversion = 1000;

  constructor(private snackBar: MatSnackBar, private cartService: CartService) {}

  addCart(): void {
    this.cartService.addProduct(this.product, 1);
    const snackBarRef = this.snackBar.open(this.product.name + ' added to cart.', 'Undo', {
      duration: 5000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.cartService.subQuantity(this.product, 1, true);
    });
  }
}

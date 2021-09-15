import { ConfirmAddCartComponent } from './confirm-add-cart/confirm-add-cart.component';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'jhi-button-add-cart',
  templateUrl: './button-add-cart.component.html',
  styleUrls: ['./button-add-cart.component.scss'],
})
export class ButtonAddCartComponent {
  durationInSeconds = 3;
  durationConversion = 1000;

  constructor(private snackBar: MatSnackBar) {}

  addCart(): void {
    this.snackBar.openFromComponent(ConfirmAddCartComponent, {
      duration: this.durationInSeconds * this.durationConversion,
    });
  }
}

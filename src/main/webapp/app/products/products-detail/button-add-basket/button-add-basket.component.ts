import { ConfirmAddBasketComponent } from './confirm-add-basket/confirm-add-basket.component';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'jhi-button-add-basket',
  templateUrl: './button-add-basket.component.html',
  styleUrls: ['./button-add-basket.component.scss'],
})
export class ButtonAddBasketComponent {
  durationInSeconds = 3;

  constructor(private snackBar: MatSnackBar) {}

  //  ConfirmAddBasket(): void {
  //    this.snackBar.openFromComponent(ConfirmAddBasketComponent, {
  //      duration: this.durationInSeconds * 1000,
  //    });
  //  }

  ConfirmAddBasket(): void {
    this.snackBar.open('Produit ajouté au panier', 'OK', {
      duration: this.durationInSeconds * 1000,
    });
  }
}

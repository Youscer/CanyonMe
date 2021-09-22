import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from './../../cart/services/cart.service';
import { Component, Input } from '@angular/core';
import { IProduct } from 'app/product/product.model';

@Component({
  selector: 'jhi-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent{
    
  @Input() product!: IProduct;
  errmsg: string;

  constructor(private cartService: CartService, private snackBar: MatSnackBar) {
    this.errmsg = '';
  }

  addToCart(): void{
    this.cartService.addProduct(this.product, 1);
    const snackBarRef = this.snackBar.open(this.product.name + ' added to cart.', 'Undo', {
      duration: 5000,
    });
    snackBarRef.onAction().subscribe(() => {
      this.cartService.subQuantity(this.product, 1, true);
    });
  }

}

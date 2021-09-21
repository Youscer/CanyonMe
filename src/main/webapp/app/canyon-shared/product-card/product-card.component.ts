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

  constructor() {
    this.errmsg = '';
  }

}

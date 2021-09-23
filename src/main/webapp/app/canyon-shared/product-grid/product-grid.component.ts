import { Component, Input } from '@angular/core';
import { IProduct } from 'app/product/product.model';

@Component({
  selector: 'jhi-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent{
    
  @Input() products!: IProduct[];
  errmsg: string;

  constructor() {
    this.errmsg = '';
  }

}

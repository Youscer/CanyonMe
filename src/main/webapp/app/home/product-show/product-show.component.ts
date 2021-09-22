import { Component, OnInit } from '@angular/core';
import { Product } from 'app/product/product.model';
import { ProductService } from 'app/product/service/product.service';

@Component({
  selector: 'jhi-product-show',
  templateUrl: './product-show.component.html',
  styleUrls: ['./product-show.component.scss'],
})
export class ProductShowComponent implements OnInit {
  products: Product[] = [];
  allProducts: Product[] = [];
  firstItem: number = 0;

  constructor(private productService: ProductService) {
    //   empty
  }

  ngOnInit(): void {
    // fill products
    this.loadAll();
  }

  loadAll(): void {
    const params: any = {};

    this.productService.getAll().subscribe(products => {
      this.allProducts = products;
      this.products = this.allProducts.slice(0, 3);
    });
  }

  updateElements(step: number): void {
    const newItems: Array<Product> = [];
    const length = this.allProducts.length;
    this.firstItem = (this.firstItem + step) % length;
    for (let i = 0; i < 3; i++) {
      newItems.push(this.allProducts[(this.firstItem + i) % length]);
    }
    this.products = newItems;
  }
}

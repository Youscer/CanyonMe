import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';


@Component({
  selector: 'jhi-product-detail',
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | null = null;
  errmsg: string;

  constructor(protected activatedRoute: ActivatedRoute, protected productService: ProductService) {
    this.errmsg = '';
   }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.getProduct(Number(id)).subscribe(
      (product) => {
        this.product = product;
      }, error => {
        this.errmsg = error.statusText;
      }

    );
  }

  previousState(): void {
    window.history.back();
  }
}

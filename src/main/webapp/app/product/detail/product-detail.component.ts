import { IImage } from './../../entities/product/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'jhi-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct | null = null;
  errmsg: string;

  imgs: string[] | null | undefined;

  imgMain: string | null | undefined;

  constructor(protected activatedRoute: ActivatedRoute, protected productService: ProductService) {
    this.errmsg = '';
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.getProduct(Number(id)).subscribe(
      product => {
        this.product = product;
        if (product.pictures && product.pictures.length > 0) {
          this.imgs = product.pictures.map<string>(img => img.link!);
        }else{
          this.imgs = ["../../../../content/images/no_image.png"];
        }
        this.imgMain = this.imgs[0];
      },
      error => {
        this.errmsg = error.statusText;
      }
    );
  }

  previousState(): void {
    window.history.back();
  }
}

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

  imgs = [
    "https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632276054774_2008197_ST.jpg?alt=media&token=7888f9a9-fdd5-4b95-ac28-018dda697f05",
    "https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632276059348_2008197_ST1.jpg?alt=media&token=35f8e35c-f65c-4285-b01a-58a1934722b6",
    "https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632276063211_2008197_ST2.jpg?alt=media&token=5fe23678-da30-490e-8e31-3029cbcbb2bf",
    "https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632276054774_2008197_ST.jpg?alt=media&token=7888f9a9-fdd5-4b95-ac28-018dda697f05",
    "https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632276059348_2008197_ST1.jpg?alt=media&token=35f8e35c-f65c-4285-b01a-58a1934722b6",
    "https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632276063211_2008197_ST2.jpg?alt=media&token=5fe23678-da30-490e-8e31-3029cbcbb2bf",
  ];

  imgMain = this.imgs[0];

  constructor(protected activatedRoute: ActivatedRoute, protected productService: ProductService) {
    this.errmsg = '';
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.getProduct(Number(id)).subscribe(
      product => {
        this.product = product;
/*         alert('load picture' + String(product.id));
 */        if (product.pictures) {
/*           alert('picture !' + String(product.pictures.length));
 */          for (const picture of product.pictures) {
            if (picture.link) {
/*               alert(picture.link);
 */            }
          }
        }
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

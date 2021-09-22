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

  p: Product = {
    id: 1110,
    name: 'Nike Air days',
    brand: 'Nike',
    description: 'Nikde shoe for pooping',
    unitPrice: 199.0,
    quantity: 1000,
    pictures: [
      {
        productId: 1110,
        link: 'https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632254771164_s1.png?alt=media&token=1ebc6c8f-f2d8-48d2-82bd-efffe48c4bce',
      },
      {
        productId: 1110,
        link: 'https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632254778931_s2.png?alt=media&token=632a7bcf-87c2-4969-ade3-21de0104ed10',
      },
    ],
  };

  constructor(private productService: ProductService) {
    //   empty
  }

  ngOnInit(): void {
    // TODO: fill products
    // this.loadAll();
    this.products = [
      {
        id: 1107,
        name: 'user',
        brand: 'Nike',
        description: 'nike sheos luxury',
        unitPrice: 1564.0,
        quantity: 16565,
        pictures: [
          {
            productId: 1107,
            link: 'https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632253257351_r1.png?alt=media&token=c00bf291-9287-4b8b-8d1a-2585aedc6054',
          },
        ],
      },
      {
        id: 1108,
        name: 'admin',
        brand: 'gfdsgdf',
        description: 'dfgdsfg',
        unitPrice: 6.8465466e8,
        quantity: 65146846,
        pictures: [
          {
            productId: 1108,
            link: 'https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632253280155_r1.png?alt=media&token=52775217-bde4-4d47-b5b3-eadb59460815',
          },
          {
            productId: 1108,
            link: 'https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632253284605_s2.png?alt=media&token=a8f9fb26-74da-4d71-8a00-692da0c0a2f0',
          },
        ],
      },
      {
        id: 1109,
        name: 'dfhdsfh',
        brand: 'hdfshs',
        description: '5645 fsdgdfg',
        unitPrice: 5645.0,
        quantity: 54545,
        pictures: [
          {
            productId: 1109,
            link: 'https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632253863173_s2.png?alt=media&token=7b5e2f65-ddc8-46fb-b664-c967c5684283',
          },
          {
            productId: 1109,
            link: 'https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632253882751_terrain3.png?alt=media&token=f671469c-20d7-48ae-83db-8082c1ad0976',
          },
        ],
      },
      {
        id: 1110,
        name: 'Nike Air days',
        brand: 'Nike',
        description: 'Nikde shoe for pooping',
        unitPrice: 199.0,
        quantity: 1000,
        pictures: [
          {
            productId: 1110,
            link: 'https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632254771164_s1.png?alt=media&token=1ebc6c8f-f2d8-48d2-82bd-efffe48c4bce',
          },
          {
            productId: 1110,
            link: 'https://firebasestorage.googleapis.com/v0/b/canyonme-e86ae.appspot.com/o/img%2F1632254778931_s2.png?alt=media&token=632a7bcf-87c2-4969-ade3-21de0104ed10',
          },
        ],
      },
    ];
  }

  loadAll(): void {
    const params: any = {};

    this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }
}

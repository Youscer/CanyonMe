import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from 'app/product/product.model';
import { ProductService } from 'app/product/service/product.service';

@Component({
  selector: 'jhi-catalog',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products?: IProduct[];
  isLoading = false;

  searchName?: string;

  minValue = 0;
  maxValue = 500;

  constructor(protected productService: ProductService, protected modalService: NgbModal, private route: ActivatedRoute) {}

  loadAll(): void {
    this.isLoading = true;

    /*     this.productService.query().subscribe(
          (res: HttpResponse<IProduct[]>) => {
            this.isLoading = false;
            this.products = res.body ?? [];
          },
          () => {
            this.isLoading = false;
          }
        ); */
    const params: any = {};
    if (this.searchName) {
      params.name = this.searchName;
    }
    params.min = this.minValue;
    params.max = this.maxValue;

    this.productService.getAll(params).subscribe(
      products => {
        this.isLoading = false;
        this.products = products;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params.s) {
        this.searchName = String(params.s);
      } else {
        this.searchName = undefined;
      }
      this.loadAll();
    });
  }

  trackId(index: number, item: IProduct): number {
    return item.id;
  }
}

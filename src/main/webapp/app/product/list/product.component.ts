import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'jhi-catalog',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products?: IProduct[];
  isLoading = false;

  searchName?: string;

  constructor(protected productService: ProductService, protected modalService: NgbModal, private route: ActivatedRoute) { }

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
    let params: any;
    if (this.searchName) {
      params = { name: this.searchName };
    }

    this.productService.getAll(params).subscribe(
      (products) => {
        this.isLoading = false;
        this.products = products;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        if (params.s) {
          this.searchName = String(params.s);
        }else{
          this.searchName = undefined;
        }
        this.loadAll();
      }
    );

  }

  trackId(index: number, item: IProduct): number {
    return item.id;
  }
}

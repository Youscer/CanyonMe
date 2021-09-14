import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';


@Component({
<<<<<<< Updated upstream
  selector: 'jhi-product',
=======
  selector: 'jhi-catalog',
>>>>>>> Stashed changes
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  products?: IProduct[];
  isLoading = false;

  constructor(protected productService: ProductService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.productService.query().subscribe(
      (res: HttpResponse<IProduct[]>) => {
        this.isLoading = false;
        this.products = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IProduct): number {
    return item.id!;
  }

}

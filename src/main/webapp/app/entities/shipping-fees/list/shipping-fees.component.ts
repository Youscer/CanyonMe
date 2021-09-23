import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IShippingFees } from '../shipping-fees.model';
import { ShippingFeesService } from '../service/shipping-fees.service';
import { ShippingFeesDeleteDialogComponent } from '../delete/shipping-fees-delete-dialog.component';

@Component({
  selector: 'jhi-shipping-fees',
  templateUrl: './shipping-fees.component.html',
})
export class ShippingFeesComponent implements OnInit {
  shippingFees?: IShippingFees[];
  isLoading = false;

  constructor(protected shippingFeesService: ShippingFeesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.shippingFeesService.query().subscribe(
      (res: HttpResponse<IShippingFees[]>) => {
        this.isLoading = false;
        this.shippingFees = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IShippingFees): number {
    return item.id!;
  }

  delete(shippingFees: IShippingFees): void {
    const modalRef = this.modalService.open(ShippingFeesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.shippingFees = shippingFees;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

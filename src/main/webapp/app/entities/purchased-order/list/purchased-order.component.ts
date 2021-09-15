import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchasedOrder } from '../purchased-order.model';
import { PurchasedOrderService } from '../service/purchased-order.service';
import { PurchasedOrderDeleteDialogComponent } from '../delete/purchased-order-delete-dialog.component';

@Component({
  selector: 'jhi-purchased-order',
  templateUrl: './purchased-order.component.html',
})
export class PurchasedOrderComponent implements OnInit {
  purchasedOrders?: IPurchasedOrder[];
  isLoading = false;

  constructor(protected purchasedOrderService: PurchasedOrderService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.purchasedOrderService.query().subscribe(
      (res: HttpResponse<IPurchasedOrder[]>) => {
        this.isLoading = false;
        this.purchasedOrders = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPurchasedOrder): number {
    return item.id!;
  }

  delete(purchasedOrder: IPurchasedOrder): void {
    const modalRef = this.modalService.open(PurchasedOrderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchasedOrder = purchasedOrder;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchaseOrder } from '../purchase-order.model';
import { PurchaseOrderService } from '../service/purchase-order.service';
import { PurchaseOrderDeleteDialogComponent } from '../delete/purchase-order-delete-dialog.component';

@Component({
  selector: 'jhi-purchase-order',
  templateUrl: './purchase-order.component.html',
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrders?: IPurchaseOrder[];
  isLoading = false;

  constructor(protected purchaseOrderService: PurchaseOrderService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.purchaseOrderService.query().subscribe(
      (res: HttpResponse<IPurchaseOrder[]>) => {
        this.isLoading = false;
        this.purchaseOrders = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPurchaseOrder): number {
    return item.id!;
  }

  delete(purchaseOrder: IPurchaseOrder): void {
    const modalRef = this.modalService.open(PurchaseOrderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.purchaseOrder = purchaseOrder;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPurchasedOrder } from '../purchased-order.model';
import { PurchasedOrderService } from '../service/purchased-order.service';

@Component({
  templateUrl: './purchased-order-delete-dialog.component.html',
})
export class PurchasedOrderDeleteDialogComponent {
  purchasedOrder?: IPurchasedOrder;

  constructor(protected purchasedOrderService: PurchasedOrderService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.purchasedOrderService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}

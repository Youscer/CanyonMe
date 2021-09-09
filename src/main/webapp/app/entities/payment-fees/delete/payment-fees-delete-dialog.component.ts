import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaymentFees } from '../payment-fees.model';
import { PaymentFeesService } from '../service/payment-fees.service';

@Component({
  templateUrl: './payment-fees-delete-dialog.component.html',
})
export class PaymentFeesDeleteDialogComponent {
  paymentFees?: IPaymentFees;

  constructor(protected paymentFeesService: PaymentFeesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.paymentFeesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}

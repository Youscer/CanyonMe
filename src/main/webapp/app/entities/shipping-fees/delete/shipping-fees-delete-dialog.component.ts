import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IShippingFees } from '../shipping-fees.model';
import { ShippingFeesService } from '../service/shipping-fees.service';

@Component({
  templateUrl: './shipping-fees-delete-dialog.component.html',
})
export class ShippingFeesDeleteDialogComponent {
  shippingFees?: IShippingFees;

  constructor(protected shippingFeesService: ShippingFeesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.shippingFeesService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPaymentFees } from '../payment-fees.model';
import { PaymentFeesService } from '../service/payment-fees.service';
import { PaymentFeesDeleteDialogComponent } from '../delete/payment-fees-delete-dialog.component';

@Component({
  selector: 'jhi-payment-fees',
  templateUrl: './payment-fees.component.html',
})
export class PaymentFeesComponent implements OnInit {
  paymentFees?: IPaymentFees[];
  isLoading = false;

  constructor(protected paymentFeesService: PaymentFeesService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.paymentFeesService.query().subscribe(
      (res: HttpResponse<IPaymentFees[]>) => {
        this.isLoading = false;
        this.paymentFees = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IPaymentFees): number {
    return item.id!;
  }

  delete(paymentFees: IPaymentFees): void {
    const modalRef = this.modalService.open(PaymentFeesDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.paymentFees = paymentFees;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}

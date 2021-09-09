import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPaymentFees } from '../payment-fees.model';

@Component({
  selector: 'jhi-payment-fees-detail',
  templateUrl: './payment-fees-detail.component.html',
})
export class PaymentFeesDetailComponent implements OnInit {
  paymentFees: IPaymentFees | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentFees }) => {
      this.paymentFees = paymentFees;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

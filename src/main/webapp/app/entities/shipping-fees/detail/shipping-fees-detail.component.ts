import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IShippingFees } from '../shipping-fees.model';

@Component({
  selector: 'jhi-shipping-fees-detail',
  templateUrl: './shipping-fees-detail.component.html',
})
export class ShippingFeesDetailComponent implements OnInit {
  shippingFees: IShippingFees | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shippingFees }) => {
      this.shippingFees = shippingFees;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

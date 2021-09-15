import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurchasedOrder } from '../purchased-order.model';

@Component({
  selector: 'jhi-purchased-order-detail',
  templateUrl: './purchased-order-detail.component.html',
})
export class PurchasedOrderDetailComponent implements OnInit {
  purchasedOrder: IPurchasedOrder | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchasedOrder }) => {
      this.purchasedOrder = purchasedOrder;
    });
  }

  previousState(): void {
    window.history.back();
  }
}

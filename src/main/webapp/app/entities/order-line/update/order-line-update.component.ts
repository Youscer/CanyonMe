import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IOrderLine, OrderLine } from '../order-line.model';
import { OrderLineService } from '../service/order-line.service';
import { IPurchasedOrder } from 'app/entities/purchased-order/purchased-order.model';
import { PurchasedOrderService } from 'app/entities/purchased-order/service/purchased-order.service';

@Component({
  selector: 'jhi-order-line-update',
  templateUrl: './order-line-update.component.html',
})
export class OrderLineUpdateComponent implements OnInit {
  isSaving = false;

  purchasedOrdersSharedCollection: IPurchasedOrder[] = [];

  editForm = this.fb.group({
    id: [null, [Validators.required]],
    product: [null, [Validators.required]],
    productName: [null, [Validators.required]],
    quantity: [null, [Validators.required]],
    unitPrice: [null, [Validators.required]],
    discount: [],
    order: [],
  });

  constructor(
    protected orderLineService: OrderLineService,
    protected purchasedOrderService: PurchasedOrderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderLine }) => {
      this.updateForm(orderLine);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orderLine = this.createFromForm();
    if (orderLine.id !== undefined) {
      this.subscribeToSaveResponse(this.orderLineService.update(orderLine));
    } else {
      this.subscribeToSaveResponse(this.orderLineService.create(orderLine));
    }
  }

  trackPurchasedOrderById(index: number, item: IPurchasedOrder): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderLine>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(orderLine: IOrderLine): void {
    this.editForm.patchValue({
      id: orderLine.id,
      product: orderLine.product,
      productName: orderLine.productName,
      quantity: orderLine.quantity,
      unitPrice: orderLine.unitPrice,
      discount: orderLine.discount,
      order: orderLine.order,
    });

    this.purchasedOrdersSharedCollection = this.purchasedOrderService.addPurchasedOrderToCollectionIfMissing(
      this.purchasedOrdersSharedCollection,
      orderLine.order
    );
  }

  protected loadRelationshipsOptions(): void {
    this.purchasedOrderService
      .query()
      .pipe(map((res: HttpResponse<IPurchasedOrder[]>) => res.body ?? []))
      .pipe(
        map((purchasedOrders: IPurchasedOrder[]) =>
          this.purchasedOrderService.addPurchasedOrderToCollectionIfMissing(purchasedOrders, this.editForm.get('order')!.value)
        )
      )
      .subscribe((purchasedOrders: IPurchasedOrder[]) => (this.purchasedOrdersSharedCollection = purchasedOrders));
  }

  protected createFromForm(): IOrderLine {
    return {
      ...new OrderLine(),
      id: this.editForm.get(['id'])!.value,
      product: this.editForm.get(['product'])!.value,
      productName: this.editForm.get(['productName'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      discount: this.editForm.get(['discount'])!.value,
      order: this.editForm.get(['order'])!.value,
    };
  }
}

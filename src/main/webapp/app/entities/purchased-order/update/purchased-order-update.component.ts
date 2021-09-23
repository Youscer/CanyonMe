import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPurchasedOrder, PurchasedOrder } from '../purchased-order.model';
import { PurchasedOrderService } from '../service/purchased-order.service';
import { IPerson } from 'app/entities/person/person.model';
import { PersonService } from 'app/entities/person/service/person.service';

@Component({
  selector: 'jhi-purchased-order-update',
  templateUrl: './purchased-order-update.component.html',
})
export class PurchasedOrderUpdateComponent implements OnInit {
  isSaving = false;

  peopleSharedCollection: IPerson[] = [];

  editForm = this.fb.group({
    id: [null, [Validators.required]],
    orderDate: [null, [Validators.required]],
    orderState: [null, [Validators.required]],
    shippingMode: [],
    shippingFees: [],
    paymentMode: [],
    paymentFees: [],
    shippingAddress: [],
    billingAddress: [],
    person: [],
  });

  constructor(
    protected purchasedOrderService: PurchasedOrderService,
    protected personService: PersonService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ purchasedOrder }) => {
      this.updateForm(purchasedOrder);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const purchasedOrder = this.createFromForm();
    if (purchasedOrder.id !== undefined) {
      this.subscribeToSaveResponse(this.purchasedOrderService.update(purchasedOrder));
    } else {
      this.subscribeToSaveResponse(this.purchasedOrderService.create(purchasedOrder));
    }
  }

  trackPersonById(index: number, item: IPerson): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurchasedOrder>>): void {
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

  protected updateForm(purchasedOrder: IPurchasedOrder): void {
    this.editForm.patchValue({
      id: purchasedOrder.id,
      orderDate: purchasedOrder.orderDate,
      orderState: purchasedOrder.orderState,
      shippingMode: purchasedOrder.shippingMode,
      shippingFees: purchasedOrder.shippingFees,
      paymentMode: purchasedOrder.paymentMode,
      paymentFees: purchasedOrder.paymentFees,
      shippingAddress: purchasedOrder.shippingAddress,
      billingAddress: purchasedOrder.billingAddress,
      person: purchasedOrder.person,
    });

    this.peopleSharedCollection = this.personService.addPersonToCollectionIfMissing(this.peopleSharedCollection, purchasedOrder.person);
  }

  protected loadRelationshipsOptions(): void {
    this.personService
      .query()
      .pipe(map((res: HttpResponse<IPerson[]>) => res.body ?? []))
      .pipe(map((people: IPerson[]) => this.personService.addPersonToCollectionIfMissing(people, this.editForm.get('person')!.value)))
      .subscribe((people: IPerson[]) => (this.peopleSharedCollection = people));
  }

  protected createFromForm(): IPurchasedOrder {
    return {
      ...new PurchasedOrder(),
      id: this.editForm.get(['id'])!.value,
      orderDate: this.editForm.get(['orderDate'])!.value,
      orderState: this.editForm.get(['orderState'])!.value,
      shippingMode: this.editForm.get(['shippingMode'])!.value,
      shippingFees: this.editForm.get(['shippingFees'])!.value,
      paymentMode: this.editForm.get(['paymentMode'])!.value,
      paymentFees: this.editForm.get(['paymentFees'])!.value,
      shippingAddress: this.editForm.get(['shippingAddress'])!.value,
      billingAddress: this.editForm.get(['billingAddress'])!.value,
      person: this.editForm.get(['person'])!.value,
    };
  }
}

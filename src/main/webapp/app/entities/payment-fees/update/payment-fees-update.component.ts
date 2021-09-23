import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPaymentFees, PaymentFees } from '../payment-fees.model';
import { PaymentFeesService } from '../service/payment-fees.service';

@Component({
  selector: 'jhi-payment-fees-update',
  templateUrl: './payment-fees-update.component.html',
})
export class PaymentFeesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    paymentMode: [null, [Validators.required]],
    fees: [null, [Validators.required]],
  });

  constructor(protected paymentFeesService: PaymentFeesService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ paymentFees }) => {
      this.updateForm(paymentFees);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const paymentFees = this.createFromForm();
    if (paymentFees.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentFeesService.update(paymentFees));
    } else {
      this.subscribeToSaveResponse(this.paymentFeesService.create(paymentFees));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPaymentFees>>): void {
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

  protected updateForm(paymentFees: IPaymentFees): void {
    this.editForm.patchValue({
      id: paymentFees.id,
      paymentMode: paymentFees.paymentMode,
      fees: paymentFees.fees,
    });
  }

  protected createFromForm(): IPaymentFees {
    return {
      ...new PaymentFees(),
      id: this.editForm.get(['id'])!.value,
      paymentMode: this.editForm.get(['paymentMode'])!.value,
      fees: this.editForm.get(['fees'])!.value,
    };
  }
}

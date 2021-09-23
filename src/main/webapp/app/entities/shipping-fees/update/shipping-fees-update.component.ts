import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IShippingFees, ShippingFees } from '../shipping-fees.model';
import { ShippingFeesService } from '../service/shipping-fees.service';

@Component({
  selector: 'jhi-shipping-fees-update',
  templateUrl: './shipping-fees-update.component.html',
})
export class ShippingFeesUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    shippingMode: [null, [Validators.required]],
    fees: [null, [Validators.required]],
  });

  constructor(protected shippingFeesService: ShippingFeesService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ shippingFees }) => {
      this.updateForm(shippingFees);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const shippingFees = this.createFromForm();
    if (shippingFees.id !== undefined) {
      this.subscribeToSaveResponse(this.shippingFeesService.update(shippingFees));
    } else {
      this.subscribeToSaveResponse(this.shippingFeesService.create(shippingFees));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IShippingFees>>): void {
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

  protected updateForm(shippingFees: IShippingFees): void {
    this.editForm.patchValue({
      id: shippingFees.id,
      shippingMode: shippingFees.shippingMode,
      fees: shippingFees.fees,
    });
  }

  protected createFromForm(): IShippingFees {
    return {
      ...new ShippingFees(),
      id: this.editForm.get(['id'])!.value,
      shippingMode: this.editForm.get(['shippingMode'])!.value,
      fees: this.editForm.get(['fees'])!.value,
    };
  }
}

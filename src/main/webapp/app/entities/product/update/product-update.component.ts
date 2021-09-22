import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProduct, Product } from '../product.model';
import { ProductService } from '../service/product.service';
import { Picture } from '../../picture/picture.model';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  pictures: Array<string> | undefined;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    brand: [null, [Validators.required]],
    description: [null, [Validators.required]],
    unitPrice: [null, [Validators.required]],
    quantity: [null, [Validators.required]],
  });

  constructor(protected productService: ProductService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  public getPictures(pictures: Array<string>): void {
    this.pictures = pictures;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
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
    this.pictures = [];
  }

  protected updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      brand: product.brand,
      description: product.description,
      unitPrice: product.unitPrice,
      quantity: product.quantity,
    });
  }

  protected createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      brand: this.editForm.get(['brand'])!.value,
      description: this.editForm.get(['description'])!.value,
      unitPrice: this.editForm.get(['unitPrice'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      pictures: this.pictures?.map(p => new Picture(null, p, null)),
    };
  }
}

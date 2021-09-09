import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IClient, Client } from '../client.model';
import { ClientService } from '../service/client.service';
import { IAddress } from 'app/entities/address/address.model';
import { AddressService } from 'app/entities/address/service/address.service';

@Component({
  selector: 'jhi-client-update',
  templateUrl: './client-update.component.html',
})
export class ClientUpdateComponent implements OnInit {
  isSaving = false;

  billingAddressesCollection: IAddress[] = [];
  shippingAddressesCollection: IAddress[] = [];

  editForm = this.fb.group({
    id: [null, [Validators.required]],
    birthDate: [null, [Validators.required]],
    billingAddress: [],
    shippingAddress: [],
  });

  constructor(
    protected clientService: ClientService,
    protected addressService: AddressService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => {
      this.updateForm(client);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const client = this.createFromForm();
    if (client.id !== undefined) {
      this.subscribeToSaveResponse(this.clientService.update(client));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(client));
    }
  }

  trackAddressById(index: number, item: IAddress): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>): void {
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

  protected updateForm(client: IClient): void {
    this.editForm.patchValue({
      id: client.id,
      birthDate: client.birthDate,
      billingAddress: client.billingAddress,
      shippingAddress: client.shippingAddress,
    });

    this.billingAddressesCollection = this.addressService.addAddressToCollectionIfMissing(
      this.billingAddressesCollection,
      client.billingAddress
    );
    this.shippingAddressesCollection = this.addressService.addAddressToCollectionIfMissing(
      this.shippingAddressesCollection,
      client.shippingAddress
    );
  }

  protected loadRelationshipsOptions(): void {
    this.addressService
      .query({ filter: 'client-is-null' })
      .pipe(map((res: HttpResponse<IAddress[]>) => res.body ?? []))
      .pipe(
        map((addresses: IAddress[]) =>
          this.addressService.addAddressToCollectionIfMissing(addresses, this.editForm.get('billingAddress')!.value)
        )
      )
      .subscribe((addresses: IAddress[]) => (this.billingAddressesCollection = addresses));

    this.addressService
      .query({ filter: 'client-is-null' })
      .pipe(map((res: HttpResponse<IAddress[]>) => res.body ?? []))
      .pipe(
        map((addresses: IAddress[]) =>
          this.addressService.addAddressToCollectionIfMissing(addresses, this.editForm.get('shippingAddress')!.value)
        )
      )
      .subscribe((addresses: IAddress[]) => (this.shippingAddressesCollection = addresses));
  }

  protected createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id'])!.value,
      birthDate: this.editForm.get(['birthDate'])!.value,
      billingAddress: this.editForm.get(['billingAddress'])!.value,
      shippingAddress: this.editForm.get(['shippingAddress'])!.value,
    };
  }
}

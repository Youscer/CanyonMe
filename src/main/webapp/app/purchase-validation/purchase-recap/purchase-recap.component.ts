import { PaymentMode } from 'app/entities/enumerations/payment-mode.model';
import { ShippingFees } from './../../entities/shipping-fees/shipping-fees.model';
import { Cart, ICart } from './../../cart/cart.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'app/cart/services/cart.service';
import { ShippingFeesService } from 'app/entities/shipping-fees/service/shipping-fees.service';
import { IShippingFees } from 'app/entities/shipping-fees/shipping-fees.model';
import { HttpResponse } from '@angular/common/http';
import { PaymentFeesService } from 'app/entities/payment-fees/service/payment-fees.service';
import { IPaymentFees } from 'app/entities/payment-fees/payment-fees.model';

// Colonnes Tableau panier recap
export interface cartData {
  article: string;
  quantite: number;
  prix: number;
}

@Component({
  selector: 'jhi-purchase-recap',
  templateUrl: './purchase-recap.component.html',
  styleUrls: ['./purchase-recap.component.scss'],
})
export class PurchaseRecapComponent implements OnInit {
  // Stepper
  AdressesFormGroup = this._formBuilder.group({
    ShippingFirstNameCtrl: ['', Validators.required],
    ShippingLastNameCtrl: ['', Validators.required],
    ShippingStreetCtrl: ['', Validators.required],
    ShippingCityCtrl: ['', Validators.required],
    ShippingStateCtrl: ['', Validators.required],
    ShippingZipCodeCtrl: ['', Validators.required],
    BillingFirstNameCtrl: ['', Validators.required],
    BillingLastNameCtrl: ['', Validators.required],
    BillingStreetCtrl: ['', Validators.required],
    BillingCityCtrl: ['', Validators.required],
    BillingStateCtrl: ['', Validators.required],
    BillingZipCodeCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    SelectShippingMode: [null, Validators.required],
    SelectPaymentMode: [null, Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  isEditable = true;

  // Tableau panier recap
  displayedColumns: string[] = ['article', 'quantite', 'prix'];
  ELEMENT_DATA: cartData[] = [];
  dataSource = this.ELEMENT_DATA;

  // Recuperation montant de la shippingfee selectionnee
  selectedShippingMode = this.thirdFormGroup.get('SelectShippingMode')!.value;

  //selectedShippingModeMode = this.selectedShippingMode

  // Recuperation montant de la paymentfee selectionnee
  selectedPaymentMode = this.thirdFormGroup.get('SelectPaymentMode')!.value;

  // Cart
  cart: ICart;
  totalPriceCart = 0;

  // shippingFees
  shippingFees?: IShippingFees[];
  isLoadingShippingFees = false;

  // paymentFees
  paymentFees?: IPaymentFees[];
  isLoadingPaymentFees = false;

  constructor(
    public cartService: CartService,
    private _formBuilder: FormBuilder,
    protected shippingFeesService: ShippingFeesService,
    protected paymentFeesService: PaymentFeesService
  ) {
    this.cart = new Cart();
    this.shippingFees === new ShippingFees();
  }

  loadAll(): void {
    // ShippingFees
    this.isLoadingShippingFees = true;

    this.shippingFeesService.query().subscribe(
      (res: HttpResponse<IShippingFees[]>) => {
        this.isLoadingShippingFees = false;
        this.shippingFees = res.body ?? [];
      },
      () => {
        this.isLoadingShippingFees = false;
      }
    );
    //PaymentFees
    this.isLoadingPaymentFees = true;

    this.paymentFeesService.query().subscribe(
      (res: HttpResponse<IPaymentFees[]>) => {
        this.isLoadingPaymentFees = false;
        this.paymentFees = res.body ?? [];
      },
      () => {
        this.isLoadingPaymentFees = false;
      }
    );
  }

  ngOnInit(): void {
    // Recuperation panier et peuplement tableau panier recap
    this.cart = this.cartService.getCart();

    for (const item of this.cart.items) {
      this.ELEMENT_DATA.push({ article: item.product.name, quantite: item.quantity, prix: item.product.unitPrice * item.quantity });
    }
    this.totalPriceCart = this.cartService.getTotalPrice();

    // Recuperation ShippingFees et PaymentFees
    this.loadAll();
    // Peuplement boutons radio
    for (const shippingFee of this.shippingFees!) {
      this.shippingFees?.push({ id: shippingFee.fees, shippingMode: shippingFee.shippingMode, fees: shippingFee.fees });
    }

    // Peuplement boutons radio
    for (const paymentFee of this.paymentFees!) {
      this.paymentFees?.push({ id: paymentFee.fees, paymentMode: paymentFee.paymentMode, fees: paymentFee.fees });
    }
  }
}

import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'app/cart/services/cart.service';
import { IPaymentFees } from 'app/entities/payment-fees/payment-fees.model';
import { PaymentFeesService } from 'app/entities/payment-fees/service/payment-fees.service';
import { ShippingFeesService } from 'app/entities/shipping-fees/service/shipping-fees.service';
import { IShippingFees } from 'app/entities/shipping-fees/shipping-fees.model';
import { IProduct } from 'app/product/product.model';
import { Cart, ICart } from './../../cart/cart.model';
import { ShippingFees } from './../../entities/shipping-fees/shipping-fees.model';
import { OrderService } from './../service/order.service';
import { DialogOrderComponent } from './dialog/dialog-order.component';

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
  adressesFormGroup = this._formBuilder.group({
    shippingFirstNameCtrl: ['', Validators.required],
    shippingLastNameCtrl: ['', Validators.required],
    shippingStreetCtrl: ['', Validators.required],
    shippingComplementCtrl: ['', Validators.nullValidator],
    shippingCityCtrl: ['', Validators.required],
    shippingStateCtrl: ['', Validators.required],
    shippingZipCodeCtrl: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    billingFirstNameCtrl: ['', Validators.required],
    billingLastNameCtrl: ['', Validators.required],
    billingStreetCtrl: ['', Validators.required],
    billingComplementCtrl: ['', Validators.nullValidator],
    billingCityCtrl: ['', Validators.required],
    billingStateCtrl: ['', Validators.required],
    billingZipCodeCtrl: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
  });
  thirdFormGroup = this._formBuilder.group({
    selectShippingMode: [null, Validators.required],
    selectPaymentMode: [null, Validators.required],
  });
  isEditable = true;

  // Tableau panier recap
  displayedColumns: string[] = ['article', 'quantite', 'prix'];
  ELEMENT_DATA: cartData[] = [];
  dataSource = this.ELEMENT_DATA;

  // Recuperation valeurs adresses
  selectedShippingFirstName = this.adressesFormGroup.get('shippingFirstNameCtrl')!.value;
  selectedShippingLastName = this.adressesFormGroup.get('shippingLastNameCtrl')!.value;
  selectedShippingStreet = this.adressesFormGroup.get('shippingStreetCtrl')!.value;
  selectedShippingComplement = this.adressesFormGroup.get('shippingComplementCtrl')!.value;
  selectedShippingCity = this.adressesFormGroup.get('shippingCityCtrl')!.value;
  selectedShippingState = this.adressesFormGroup.get('shippingStateCtrl')!.value;
  selectedShippingZipCode = this.adressesFormGroup.get('shippingZipCodeCtrl')!.value;
  selectedBillingFirstName = this.adressesFormGroup.get('billingFirstNameCtrl')!.value;
  selectedBillingLastName = this.adressesFormGroup.get('billingLastNameCtrl')!.value;
  selectedBillingStreet = this.adressesFormGroup.get('billingStreetCtrl')!.value;
  selectedBillingComplement = this.adressesFormGroup.get('billingComplementCtrl')!.value;
  selectedBillingCity = this.adressesFormGroup.get('billingCityCtrl')!.value;
  selectedBillingState = this.adressesFormGroup.get('billingStateCtrl')!.value;
  selectedBillingZipCode = this.adressesFormGroup.get('billingZipCodeCtrl')!.value;

  // Recuperation montant de la shippingfee selectionnee
  selectedShippingMode?: IShippingFees;

  // Recuperation montant de la paymentfee selectionnee
  selectedPaymentMode?: IPaymentFees;

  // Cart
  cart: ICart;
  totalPriceCart = 0;

  // shippingFees
  shippingFees?: IShippingFees[];
  isLoadingShippingFees = false;

  // paymentFees
  paymentFees?: IPaymentFees[];
  isLoadingPaymentFees = false;

  // initialisation copie billing adress à partir de la shipping adress
  checkboxFlag = true;

  constructor(
    public cartService: CartService,
    private _formBuilder: FormBuilder,
    protected shippingFeesService: ShippingFeesService,
    protected paymentFeesService: PaymentFeesService,
    private router: Router,
    public orderService: OrderService,
    public dialog: MatDialog
  ) {
    this.cart = new Cart();
    this.shippingFees === new ShippingFees();
  }

  // Gestion billing adress si identique a shipping adress
  SetBilling(checked: boolean): void {
    if (checked) {
      document.getElementById('billingaddress')!.style.display = 'none';
      this.selectedBillingFirstName = this.selectedShippingFirstName;
      this.selectedBillingLastName = this.selectedShippingLastName;
      this.selectedBillingStreet = this.selectedShippingStreet;
      this.selectedBillingComplement = this.selectedShippingComplement;
      this.selectedBillingCity = this.selectedShippingCity;
      this.selectedBillingState = this.selectedShippingState;
      this.selectedBillingZipCode = this.selectedShippingZipCode;
    } else {
      document.getElementById('billingaddress')!.style.display = 'block';
      this.selectedBillingFirstName = '';
      this.selectedBillingLastName = '';
      this.selectedBillingStreet = '';
      this.selectedBillingComplement = '';
      this.selectedBillingCity = '';
      this.selectedBillingState = '';
      this.selectedBillingZipCode = '';
    }
    this.checkboxFlag = checked;
  }

  postCartOrder(): void {
    this.orderService.postCartOrder(this.cartService.getCart(), 1, 1, '35 rue du test', '35 rue du test').subscribe(
      () => {
        this.cartService.deleteAllCart();
        this.router.navigate(['/purchase-confirmation']);
      },
      error => {
        if (Number(error.status) === 409) {
          const changes = this.cartService.adjustQuantity(error.error as IProduct[]);
          this.dialog.open(DialogOrderComponent, { data: changes });
          this.router.navigate(['/cart']);
        }
      }
    );
  }

  loadAll(): void {
    // shippingFees
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
    // paymentFees
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

  getTotalCommandPrice(): number {
    let totalCommandPrice = 0;
    totalCommandPrice = this.totalPriceCart + (this.selectedShippingMode?.fees ?? 0) + (this.selectedPaymentMode?.fees ?? 0);
    //totalCommandPrice = this.totalPriceCart
    return totalCommandPrice;
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

    //Initialisation billing adress
    this.SetBilling(this.checkboxFlag);
  }
}

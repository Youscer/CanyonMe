import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartService } from 'app/cart/services/cart.service';
import { OrderService } from './../service/order.service';

// Colonnes Tableau
export interface PeriodicElement {
  article: string;
  prix: number;
}

// Data Tableau
const ELEMENT_DATA: PeriodicElement[] = [
  { article: 'Casque', prix: 39.9 },
  { article: 'Corde', prix: 29.9 },
  { article: 'Gourde', prix: 18.9 },
];

@Component({
  selector: 'jhi-purchase-recap',
  templateUrl: './purchase-recap.component.html',
  styleUrls: ['./purchase-recap.component.scss'],
})
export class PurchaseRecapComponent implements OnInit {
  //Stepper
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    SelectShippingMode: [null, Validators.required],
    SelectPaymentMode: [null, Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    fourthCtrl: ['', Validators.required],
  });
  isEditable = false;

  //Tableau
  displayedColumns: string[] = ['article', 'prix'];
  dataSource = ELEMENT_DATA;

  //Bouton Radio
  selectedShippingMode = this.thirdFormGroup.get('SelectShippingMode')!.value;
  ShippingModes: string[] = ['UPS', 'DPD'];
  selectedPaymentMode = this.thirdFormGroup.get('SelectPaymentMode')!.value;
  PaymentModes: string[] = ['Carte Bancaire', 'Paypal'];

  constructor(private cartService: CartService, private _formBuilder: FormBuilder, public orderService: OrderService) { }

  ngOnInit(): void {
    return;
  }

  postCartOrder(): void {
    this.orderService.postCartOrder(this.cartService.getCart(), 'UPS', 'PAYPAL').subscribe(
      () => {
        alert('OrderPosted');
      },
      (error) => {
        alert(error.message);
        switch (error.status) {
          case 500:
            
            break;
        }
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { ShippingInformationsUpdateService } from '../shipping-informations/shipping-informations-update.service';

@Component({
  selector: 'jhi-purchase-recap',
  templateUrl: './purchase-recap.component.html',
  styleUrls: ['./purchase-recap.component.scss'],
})
export class PurchaseRecapComponent implements OnInit {
  constructor(private cartService: ShippingInformationsUpdateService) {}

  ngOnInit(): void {
    return;
  }
}

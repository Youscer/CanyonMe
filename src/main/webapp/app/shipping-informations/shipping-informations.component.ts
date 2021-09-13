import { Component, OnInit } from '@angular/core';
import { ShippingInformationsUpdateService } from './shipping-informations-update.service';

@Component({
  selector: 'jhi-shipping-informations',
  templateUrl: './shipping-informations.component.html',
  styleUrls: ['./shipping-informations.component.scss'],
})
export class ShippingInformationsComponent implements OnInit {
  count = 0;
  constructor(private shippingInformationsUpdateService: ShippingInformationsUpdateService) {}

  ngOnInit(): void {
    this.count += 1;
  }
}

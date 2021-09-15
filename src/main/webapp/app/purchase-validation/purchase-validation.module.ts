import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PurchaseRecapComponent } from './purchase-recap/purchase-recap.component';
import { purchaseValidationRoutes } from './purchase-validation.route';
import { ShippingInformationsComponent } from './shipping-informations/shipping-informations.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(purchaseValidationRoutes)],
  exports: [RouterModule],
  declarations: [PurchaseRecapComponent, ShippingInformationsComponent],
  entryComponents: [PurchaseRecapComponent, ShippingInformationsComponent],
})
export class PurchaseValidationModule {}

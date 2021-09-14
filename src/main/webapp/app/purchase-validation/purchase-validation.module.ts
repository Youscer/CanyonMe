import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { PurchaseRecapComponent } from './purchase-recap/purchase-recap.component';
import { purchaseValidationRoutes } from './purchase-validation.route';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(purchaseValidationRoutes)],
  exports: [RouterModule],
  declarations: [PurchaseRecapComponent],
  entryComponents: [PurchaseRecapComponent],
})
export class PurchaseValidationModule {}

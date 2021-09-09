import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ShippingFeesComponent } from './list/shipping-fees.component';
import { ShippingFeesDetailComponent } from './detail/shipping-fees-detail.component';
import { ShippingFeesUpdateComponent } from './update/shipping-fees-update.component';
import { ShippingFeesDeleteDialogComponent } from './delete/shipping-fees-delete-dialog.component';
import { ShippingFeesRoutingModule } from './route/shipping-fees-routing.module';

@NgModule({
  imports: [SharedModule, ShippingFeesRoutingModule],
  declarations: [ShippingFeesComponent, ShippingFeesDetailComponent, ShippingFeesUpdateComponent, ShippingFeesDeleteDialogComponent],
  entryComponents: [ShippingFeesDeleteDialogComponent],
})
export class ShippingFeesModule {}

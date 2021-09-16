import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PurchasedOrderComponent } from './list/purchased-order.component';
import { PurchasedOrderDetailComponent } from './detail/purchased-order-detail.component';
import { PurchasedOrderUpdateComponent } from './update/purchased-order-update.component';
import { PurchasedOrderDeleteDialogComponent } from './delete/purchased-order-delete-dialog.component';
import { PurchasedOrderRoutingModule } from './route/purchased-order-routing.module';

@NgModule({
  imports: [SharedModule, PurchasedOrderRoutingModule],
  declarations: [
    PurchasedOrderComponent,
    PurchasedOrderDetailComponent,
    PurchasedOrderUpdateComponent,
    PurchasedOrderDeleteDialogComponent,
  ],
  entryComponents: [PurchasedOrderDeleteDialogComponent],
})
export class PurchasedOrderModule {}

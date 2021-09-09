import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PaymentFeesComponent } from './list/payment-fees.component';
import { PaymentFeesDetailComponent } from './detail/payment-fees-detail.component';
import { PaymentFeesUpdateComponent } from './update/payment-fees-update.component';
import { PaymentFeesDeleteDialogComponent } from './delete/payment-fees-delete-dialog.component';
import { PaymentFeesRoutingModule } from './route/payment-fees-routing.module';

@NgModule({
  imports: [SharedModule, PaymentFeesRoutingModule],
  declarations: [PaymentFeesComponent, PaymentFeesDetailComponent, PaymentFeesUpdateComponent, PaymentFeesDeleteDialogComponent],
  entryComponents: [PaymentFeesDeleteDialogComponent],
})
export class PaymentFeesModule {}

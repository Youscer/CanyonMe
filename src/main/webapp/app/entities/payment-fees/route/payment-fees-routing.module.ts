import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PaymentFeesComponent } from '../list/payment-fees.component';
import { PaymentFeesDetailComponent } from '../detail/payment-fees-detail.component';
import { PaymentFeesUpdateComponent } from '../update/payment-fees-update.component';
import { PaymentFeesRoutingResolveService } from './payment-fees-routing-resolve.service';

const paymentFeesRoute: Routes = [
  {
    path: '',
    component: PaymentFeesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PaymentFeesDetailComponent,
    resolve: {
      paymentFees: PaymentFeesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PaymentFeesUpdateComponent,
    resolve: {
      paymentFees: PaymentFeesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PaymentFeesUpdateComponent,
    resolve: {
      paymentFees: PaymentFeesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(paymentFeesRoute)],
  exports: [RouterModule],
})
export class PaymentFeesRoutingModule {}

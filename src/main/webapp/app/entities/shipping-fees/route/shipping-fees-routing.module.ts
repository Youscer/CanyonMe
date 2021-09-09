import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ShippingFeesComponent } from '../list/shipping-fees.component';
import { ShippingFeesDetailComponent } from '../detail/shipping-fees-detail.component';
import { ShippingFeesUpdateComponent } from '../update/shipping-fees-update.component';
import { ShippingFeesRoutingResolveService } from './shipping-fees-routing-resolve.service';

const shippingFeesRoute: Routes = [
  {
    path: '',
    component: ShippingFeesComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShippingFeesDetailComponent,
    resolve: {
      shippingFees: ShippingFeesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShippingFeesUpdateComponent,
    resolve: {
      shippingFees: ShippingFeesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShippingFeesUpdateComponent,
    resolve: {
      shippingFees: ShippingFeesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(shippingFeesRoute)],
  exports: [RouterModule],
})
export class ShippingFeesRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PurchasedOrderComponent } from '../list/purchased-order.component';
import { PurchasedOrderDetailComponent } from '../detail/purchased-order-detail.component';
import { PurchasedOrderUpdateComponent } from '../update/purchased-order-update.component';
import { PurchasedOrderRoutingResolveService } from './purchased-order-routing-resolve.service';

const purchasedOrderRoute: Routes = [
  {
    path: '',
    component: PurchasedOrderComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PurchasedOrderDetailComponent,
    resolve: {
      purchasedOrder: PurchasedOrderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PurchasedOrderUpdateComponent,
    resolve: {
      purchasedOrder: PurchasedOrderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PurchasedOrderUpdateComponent,
    resolve: {
      purchasedOrder: PurchasedOrderRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(purchasedOrderRoute)],
  exports: [RouterModule],
})
export class PurchasedOrderRoutingModule {}

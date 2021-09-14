import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CartComponent } from '../list/cart.component';

const cartRoute: Routes = [
  {
    path: '',
    component: CartComponent,
    canActivate: [UserRouteAccessService],
  }
];

@NgModule({
  imports: [RouterModule.forChild(cartRoute)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

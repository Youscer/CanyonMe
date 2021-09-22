import { PurchaseConfirmationComponent } from './purchase-validation/purchase-confirmation/purchase-confirmation.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/config/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CartComponent } from './cart/list/cart.component';
import { errorRoute } from './layouts/error/error.route';
import { toolbarRoute } from './layouts/toolbar/toolbar.route';

const LAYOUT_ROUTES = [toolbarRoute, ...errorRoute];

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN],
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule),
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        },
        {
          path: 'login',
          loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        },
        {
          path: 'purchase-validation',
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./purchase-validation/purchase-validation.module').then(m => m.PurchaseValidationModule),
        },
        {
          path: 'catalog',
          data: { pageTitle: 'canyonMeApp.product.home.title' },
          loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
        },
        {
          path: 'cart',
          component: CartComponent,
        },
        {
          path: 'purchase-confirmation',
          component: PurchaseConfirmationComponent,
        },
        ...LAYOUT_ROUTES,
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

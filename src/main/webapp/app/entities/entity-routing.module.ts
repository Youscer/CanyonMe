import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'entities/shipping-fees',
        data: { pageTitle: 'canyonMeApp.shippingFees.home.title' },
        loadChildren: () => import('./shipping-fees/shipping-fees.module').then(m => m.ShippingFeesModule),
      },
      {
        path: 'entities/payment-fees',
        data: { pageTitle: 'canyonMeApp.paymentFees.home.title' },
        loadChildren: () => import('./payment-fees/payment-fees.module').then(m => m.PaymentFeesModule),
      },
      {
        path: 'entities/address',
        data: { pageTitle: 'canyonMeApp.address.home.title' },
        loadChildren: () => import('./address/address.module').then(m => m.AddressModule),
      },
      {
        path: 'entities/person',
        data: { pageTitle: 'canyonMeApp.person.home.title' },
        loadChildren: () => import('./person/person.module').then(m => m.PersonModule),
      },
      {
        path: 'entities/employee',
        data: { pageTitle: 'canyonMeApp.employee.home.title' },
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'entities/purchased-order',
        data: { pageTitle: 'canyonMeApp.purchasedOrder.home.title' },
        loadChildren: () => import('./purchased-order/purchased-order.module').then(m => m.PurchasedOrderModule),
      },
      {
        path: 'entities/order-line',
        data: { pageTitle: 'canyonMeApp.orderLine.home.title' },
        loadChildren: () => import('./order-line/order-line.module').then(m => m.OrderLineModule),
      },
      {
        path: 'entities/product',
        data: { pageTitle: 'canyonMeApp.product.home.title' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'entities/picture',
        data: { pageTitle: 'canyonMeApp.picture.home.title' },
        loadChildren: () => import('./picture/picture.module').then(m => m.PictureModule),
      },
      {
        path: 'entities/discount',
        data: { pageTitle: 'canyonMeApp.discount.home.title' },
        loadChildren: () => import('./discount/discount.module').then(m => m.DiscountModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}

import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProductComponent } from './list/product.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductRoutingModule } from './route/product-routing.module';
import { ButtonAddCartComponent } from './detail/button-add-cart/button-add-cart.component';
import { ConfirmAddCartComponent } from './detail/button-add-cart/confirm-add-cart/confirm-add-cart.component';

@NgModule({
  imports: [SharedModule, ProductRoutingModule, MatButtonModule],
  declarations: [ProductComponent, ProductDetailComponent, ButtonAddCartComponent, ConfirmAddCartComponent],
  entryComponents: [ProductComponent],
})
export class ProductModule {}

import { MatSliderModule } from '@angular/material/slider';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductGridModule } from 'app/canyon-shared/product-grid/product-grid.module';
import { SharedModule } from 'app/shared/shared.module';
import { ButtonAddCartComponent } from './detail/button-add-cart/button-add-cart.component';
import { ConfirmAddCartComponent } from './detail/button-add-cart/confirm-add-cart/confirm-add-cart.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductComponent } from './list/product.component';
import { ProductRoutingModule } from './route/product-routing.module';

@NgModule({
  imports: [SharedModule, ProductRoutingModule, MatButtonModule, MatCardModule, ProductGridModule, MatSliderModule],
  declarations: [ProductComponent, ProductDetailComponent, ButtonAddCartComponent, ConfirmAddCartComponent],
})
export class ProductModule { }

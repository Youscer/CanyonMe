import { SharedModule } from './../../shared/shared.module';
import { ProductGridComponent } from './product-grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { ProductCardModule } from '../product-card/product-card.module';


@NgModule({
  imports: [SharedModule, MatButtonModule, MatGridListModule, ProductCardModule],
  declarations: [ProductGridComponent],
  exports: [ProductGridComponent],
})
export class ProductGridModule { }
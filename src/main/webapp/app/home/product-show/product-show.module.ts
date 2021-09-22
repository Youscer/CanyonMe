import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductShowComponent } from './product-show.component';
import { ProductGridModule } from 'app/canyon-shared/product-grid/product-grid.module';

@NgModule({
  imports: [CommonModule, NgbModule, ProductGridModule],
  declarations: [ProductShowComponent],
  entryComponents: [ProductShowComponent],
  exports: [ProductShowComponent],
})
export class ProductShowModule {}

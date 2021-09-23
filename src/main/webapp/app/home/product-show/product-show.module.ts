import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductShowComponent } from './product-show.component';
import { ProductGridModule } from 'app/canyon-shared/product-grid/product-grid.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, NgbModule, ProductGridModule, MatButtonModule, MatIconModule],
  declarations: [ProductShowComponent],
  entryComponents: [ProductShowComponent],
  exports: [ProductShowComponent],
})
export class ProductShowModule {}

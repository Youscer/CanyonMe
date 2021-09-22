import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ProductCardComponent } from './product-card.component';

@NgModule({
    imports: [SharedModule, RouterModule, MatButtonModule, MatCardModule],
    declarations: [ProductCardComponent],
    entryComponents: [ProductCardComponent],
    exports: [ProductCardComponent],
  })
  export class ProductCardModule {}
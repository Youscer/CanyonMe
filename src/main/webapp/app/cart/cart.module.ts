import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CartComponent } from './list/cart.component';

@NgModule({
  imports: [MatCardModule],
  declarations: [CartComponent],
})
export class CartModule {}

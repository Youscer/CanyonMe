import { ProductComponent } from '../list/product.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from '../detail/product-detail.component';

const productRoute: Routes = [
  {
    path: '',
    component: ProductComponent,
  },
  {
    path: ':id',
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(productRoute)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}

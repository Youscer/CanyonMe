import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { CarouselModule } from './carousel/carousel.module';
import { ProductShowModule } from './product-show/product-show.module';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([HOME_ROUTE]), CarouselModule, ProductShowModule],
  declarations: [HomeComponent],
})
export class HomeModule {}

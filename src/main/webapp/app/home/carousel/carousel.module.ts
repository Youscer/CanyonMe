import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarouselComponent } from './carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, NgbModule],
  declarations: [CarouselComponent],
  entryComponents: [CarouselComponent],
  exports: [CarouselComponent],
})
export class CarouselModule {}

import { Component, Input, OnInit } from '@angular/core';
import { ISlide } from './carousel.model';

@Component({
  selector: 'jhi-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() slides: ISlide[] | undefined;
  images: Array<string> = [];

  constructor() {
    // empty
  }

  ngOnInit(): void {
    this.images = [944, 1011, 984].map(n => `https://picsum.photos/id/${n}/1200/500`);
  }
}

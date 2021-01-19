import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@Component({
  selector: 'rob-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterContentInit {
  @ContentChildren(CarouselItemComponent)
  carouselItems: QueryList<CarouselItemComponent>;

  public activeIndex = 0;

  public interval;

  public ngAfterContentInit(): void {
    console.log(this.carouselItems);
    this.carouselItems.first.isActive = true;

    this.startCarousel();
  }

  public startCarousel() {
    this.interval = setInterval(() => {
      this.activeIndex =
        this.activeIndex + 1 >= this.carouselItems.length
          ? 0
          : this.activeIndex + 1;

      this.carouselItems.map((item, index) => {
        // eslint-disable-next-line no-param-reassign
        item.isActive = this.activeIndex === index;
      });
    }, 1000);
  }
}

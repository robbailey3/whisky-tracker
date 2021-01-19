import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
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

  @Input() interval = 10000;

  private setIntervalReturn;

  public activeIndex = 0;

  public ngAfterContentInit(): void {
    console.log(this.carouselItems);

    this.startCarousel();
  }

  public startCarousel() {
    this.setIntervalReturn = setInterval(() => {
      this.activeIndex =
        this.activeIndex + 1 >= this.carouselItems.length
          ? 0
          : this.activeIndex + 1;

      this.carouselItems.map((item, index) => {
        // eslint-disable-next-line no-param-reassign
        item.isActive = this.activeIndex === index;
      });
    }, this.interval);
  }
}

import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList
} from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
  faCircle,
  faDotCircle
} from '@fortawesome/free-solid-svg-icons';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@Component({
  selector: 'rob-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterContentInit {
  @ContentChildren(CarouselItemComponent)
  carouselItems: QueryList<CarouselItemComponent>;

  @Input() interval = 1000;

  private setIntervalReturn: NodeJS.Timeout;

  public activeIndex = 0;

  public faChevronRight = faChevronRight;

  public faChevronLeft = faChevronLeft;

  public faDotCircle = faDotCircle;

  public faCircle = faCircle;

  public ngAfterContentInit(): void {
    if (this.carouselItems.length === 0 || !this.carouselItems) {
      throw new Error(
        'CarouselComponent *needs* to have CarouselItemComponents as children'
      );
    }
    this.carouselItems.first.isActive = true;
    this.startCarousel();
  }

  public startCarousel() {
    this.setIntervalReturn = (setInterval(() => {
      this.next();
    }, this.interval) as unknown) as NodeJS.Timeout;
  }

  public pause() {
    clearInterval(this.setIntervalReturn);
  }

  private setActiveCarouselItem(index?: number) {
    if (index !== undefined) {
      this.pause();
      this.activeIndex = index;
      this.startCarousel();
    }
    this.carouselItems.forEach((item, i) => {
      // eslint-disable-next-line no-param-reassign
      item.isActive = this.activeIndex === i;
    });
  }

  public handleNextClick() {
    this.pause();
    this.next();
    this.startCarousel();
  }

  public handlePrevClick() {
    this.pause();
    this.prev();
    this.startCarousel();
  }

  private next() {
    this.activeIndex =
      this.activeIndex + 1 >= this.carouselItems.length
        ? 0
        : this.activeIndex + 1;

    this.setActiveCarouselItem();
  }

  private prev() {
    this.activeIndex =
      this.activeIndex - 1 < 0
        ? this.carouselItems.length - 1
        : this.activeIndex - 1;

    this.setActiveCarouselItem();
  }
}

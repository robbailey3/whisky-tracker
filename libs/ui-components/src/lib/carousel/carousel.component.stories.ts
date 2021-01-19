import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { CarouselComponent } from './carousel.component';

export default {
  title: 'CarouselComponent'
};

export const primary = () => ({
  moduleMetadata: {
    declarations: [CarouselComponent, CarouselItemComponent]
  },
  template: `
  <rob-carousel>
    <rob-carousel-item><h1>Item 1</h1></rob-carousel-item>
    <rob-carousel-item><h1>Item 2</h1></rob-carousel-item>
    <rob-carousel-item><h1>Item 3</h1></rob-carousel-item>
    <rob-carousel-item><h1>Item 4</h1></rob-carousel-item>
  </rob-carousel>`,
  props: {}
});

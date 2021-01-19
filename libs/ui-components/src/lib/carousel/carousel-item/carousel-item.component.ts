import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'rob-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent {
  public isActive = false;
}

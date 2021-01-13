import { Component, Inject } from '@angular/core';

@Component({
  selector: 'rob-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  constructor(@Inject('tooltipConfig') private config) {
    console.log(this);
  }
}

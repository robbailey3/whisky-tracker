import { Component, Input, Output } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
  selector: 'rob-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss']
})
export class AccordionItemComponent {
  @Input() title: string;

  @Output() accordionClick: Subject<AccordionItemComponent> = new Subject();

  public state: 'open' | 'closed' = 'closed';

  public faChevronDown = faChevronDown;

  public handleClick() {
    this.accordionClick.next(this);
  }
}

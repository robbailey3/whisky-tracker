import { Component, Input } from '@angular/core';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'rob-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss']
})
export class AccordionItemComponent {
  @Input() title: string;

  public state: 'open' | 'closed' = 'closed';

  public faChevronDown = faChevronDown;

  public toggleState() {
    this.state = this.state === 'closed' ? 'open' : 'closed';
  }
}

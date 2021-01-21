import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList
} from '@angular/core';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';

@Component({
  selector: 'rob-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(AccordionItemComponent)
  accordionItems: QueryList<AccordionItemComponent>;

  public ngAfterContentInit() {
    this.accordionItems.forEach((accordionItem) => {
      accordionItem.accordionClick.subscribe({
        next: (item) => {
          this.setAccordionItemActive(item);
        }
      });
    });
  }

  public setAccordionItemActive(accordionItem: AccordionItemComponent) {
    this.accordionItems.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.state = 'closed';
    });
    // eslint-disable-next-line no-param-reassign
    accordionItem.state = 'open';
  }
}

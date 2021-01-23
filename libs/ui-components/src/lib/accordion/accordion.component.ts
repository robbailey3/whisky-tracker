import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostListener,
  QueryList,
  ViewChildren
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

  public focusedElementIndex = null;

  public ngAfterContentInit() {
    this.accordionItems.forEach((accordionItem) => {
      accordionItem.accordionClick.subscribe({
        next: (item) => {
          this.setAccordionItemActive(item);
        }
      });
    });
  }

  @HostListener('keyup', ['$event'])
  public handleKeyup($event: KeyboardEvent) {
    const { key } = $event;
    if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(key)) {
      if (key === 'ArrowUp') {
        this.focusedElementIndex =
          this.focusedElementIndex - 1 < 0
            ? this.accordionItems.length - 1
            : this.focusedElementIndex - 1;
      }
      if (key === 'ArrowDown') {
        this.focusedElementIndex =
          this.focusedElementIndex + 1 >= this.accordionItems.length
            ? 0
            : this.focusedElementIndex + 1;
      }
      if (key === 'Home') {
        this.focusedElementIndex = 0;
      }
      if (key === 'End') {
        this.focusedElementIndex = this.accordionItems.length - 1;
      }
      this.accordionItems
        .toArray()
        [this.focusedElementIndex].accordionButton.nativeElement.focus();
    }
  }

  public setAccordionItemActive(accordionItem: AccordionItemComponent) {
    this.focusedElementIndex = this.accordionItems
      .toArray()
      .indexOf(accordionItem);

    this.accordionItems.forEach((item) => {
      item.state = 'closed';
    });

    accordionItem.state = 'open';
  }
}

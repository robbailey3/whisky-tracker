import { Component, OnInit, Input, HostListener } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const focusableElements = [];

@Component({
  selector: 'rob-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public faTimes = faTimes;

  @Input() public state: 'open' | 'closed';

  @HostListener('window:keyup', ['$event'])
  public onKeyup(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  public ngOnInit(): void {
    this.focusFirstElement();
    console.log(this);
  }

  public focusFirstElement() {
    // TODO: Find the first focusable element and focus on it.
  }

  public close() {
    console.log('close');
    this.state = 'closed';
    console.log(this);
  }
}

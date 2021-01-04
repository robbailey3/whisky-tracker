import { Component, OnInit, Input } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'rob-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  public faWindowClose = faWindowClose;
  @Input() isActive: boolean;

  constructor() {}

  ngOnInit(): void {
    this.focusFirstElement();
  }

  public focusFirstElement() {
    console.log(this);
    // TODO: Find the first focusable element and focus on it.
  }

  public close() {
    this.isActive = false;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'rob-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {
  public faTimes = faTimes;

  @Input() title: string;

  @Input() dismissable = false;

  @Input() type: 'blue' | 'green';

  @Output() handleDismiss: EventEmitter<void> = new EventEmitter();

  public onDismissClick() {
    this.handleDismiss.emit();
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rob-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';

  @Input() href?: string;

  @Input() handleClick: ($event: MouseEvent) => void;

  @Input() disabled: boolean;

  ngOnInit() {
    console.log(this);
  }
}

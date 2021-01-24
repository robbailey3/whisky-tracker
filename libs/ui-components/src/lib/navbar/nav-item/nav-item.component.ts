import { Component, Input } from '@angular/core';

@Component({
  selector: 'rob-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input() href: string;

  @Input() routerLink: string | any[];

  @Input() activeClass: string;

  @Input() routerLinkActiveOptions: any = null;
}

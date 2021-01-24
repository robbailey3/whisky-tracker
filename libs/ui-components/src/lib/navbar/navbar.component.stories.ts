import { APP_BASE_HREF } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavbarComponent } from './navbar.component';
/* eslint-disable max-len */

export default {
  title: 'Navbar'
};
export const Navbar = (args: NavbarComponent) => ({
  moduleMetadata: {
    declarations: [NavbarComponent, NavItemComponent],
    imports: [RouterTestingModule],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
  },
  template: `
  <rob-navbar>
    <rob-nav-item>Nav Item 1</rob-nav-item>
    <rob-nav-item>Nav Item 2</rob-nav-item>
    <rob-nav-item>Nav Item 3</rob-nav-item>
    <rob-nav-item>Nav Item 4</rob-nav-item>
    <rob-nav-item>Nav Item 5</rob-nav-item>
  </rob-navbar>
  `,
  props: { ...args }
});

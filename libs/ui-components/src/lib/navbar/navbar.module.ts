import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavItemComponent } from './nav-item/nav-item.component';

@NgModule({
  declarations: [NavbarComponent, NavItemComponent],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [NavbarComponent, NavItemComponent]
})
export class NavbarModule {}

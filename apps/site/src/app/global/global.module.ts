import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, NavigationComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, NavigationComponent, FooterComponent],
})
export class GlobalModule {}

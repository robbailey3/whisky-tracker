import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [HeaderComponent, NavigationComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, NavigationComponent, FooterComponent]
})
export class GlobalModule {}

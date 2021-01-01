import { ButtonsModule } from './buttons/buttons.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, ButtonsModule],
  exports: [ButtonsModule],
  declarations: [],
})
export class UiComponentsModule {}

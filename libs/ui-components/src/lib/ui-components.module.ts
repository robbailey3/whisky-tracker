import { FormItemsModule } from './form-items/form-items.module';
import { ButtonsModule } from './buttons/buttons.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { ModalComponent } from './modal/modal.component';
import { ChipComponent } from './chip/chip.component';

@NgModule({
  imports: [CommonModule],
  exports: [ButtonsModule, FormItemsModule, AccordionComponent, ModalComponent, ChipComponent],
  declarations: [AccordionComponent, ModalComponent, ChipComponent],
})
export class UiComponentsModule {}

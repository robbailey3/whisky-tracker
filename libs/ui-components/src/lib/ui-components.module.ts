import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  FaIconComponent,
  FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { FormItemsModule } from './form-items/form-items.module';
import { ButtonsModule } from './buttons/buttons.module';
import { ModalComponent } from './modal/modal.component';
import { ChipComponent } from './chip/chip.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { AccordionModule } from './accordion/accordion.module';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, ButtonsModule, FontAwesomeModule],
  exports: [
    FontAwesomeModule,
    AccordionModule,
    ButtonsModule,
    FormItemsModule,
    ChipComponent,
    FormItemsModule,
    ModalComponent,
    CardComponent
  ],
  declarations: [ModalComponent, ChipComponent, TooltipComponent, CardComponent]
})
export class UiComponentsModule {
  constructor() {
    console.log(FontAwesomeModule);
  }
}

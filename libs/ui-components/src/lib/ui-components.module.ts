import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
export class UiComponentsModule {}

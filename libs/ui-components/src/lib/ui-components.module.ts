import { NotificationsService } from './notifications/notifications.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormItemsModule } from './form-items/form-items.module';
import { ButtonsModule } from './buttons/buttons.module';
import { ModalComponent } from './modal/modal.component';
import { ChipComponent } from './chip/chip.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { AccordionModule } from './accordion/accordion.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, ButtonsModule, FontAwesomeModule, FormItemsModule],
  exports: [
    AccordionModule,
    ButtonsModule,
    FontAwesomeModule,
    FormItemsModule,
    NotificationsModule,
    ChipComponent,
    FormItemsModule,
    ModalComponent,
    CardComponent
  ],
  providers: [NotificationsService],
  declarations: [ModalComponent, ChipComponent, TooltipComponent, CardComponent]
})
export class UiComponentsModule {}

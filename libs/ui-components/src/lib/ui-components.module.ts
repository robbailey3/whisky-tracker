import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleMapsModule } from '@angular/google-maps';
import { NotificationsService } from './notifications/notifications.service';
import { FormItemsModule } from './form-items/form-items.module';
import { ButtonsModule } from './buttons/buttons.module';
import { ModalComponent } from './modal/modal.component';
import { ChipComponent } from './chip/chip.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { AccordionModule } from './accordion/accordion.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CardComponent } from './card/card.component';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { FocusTrapDirective } from './focus-trap/focus-trap.directive';
import { AlertComponent } from './alert/alert.component';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ButtonsModule,
    FontAwesomeModule,
    FormItemsModule,
    GoogleMapsModule
  ],
  exports: [
    AccordionModule,
    ButtonsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    GoogleMapsModule,
    FormItemsModule,
    NotificationsModule,
    ChipComponent,
    FormItemsModule,
    ModalComponent,
    CardComponent,
    TooltipDirective,
    FocusTrapDirective,
    AlertComponent
  ],
  providers: [NotificationsService],
  declarations: [
    ModalComponent,
    ChipComponent,
    TooltipComponent,
    CardComponent,
    TooltipDirective,
    FocusTrapDirective,
    AlertComponent,
    MapComponent
  ]
})
export class UiComponentsModule {}

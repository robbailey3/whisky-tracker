import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from '../buttons/buttons.module';
import { NotificationComponent } from './notification/notification.component';
import { NotificationContainerComponent } from './notification-container/notification-container.component';

@NgModule({
  declarations: [NotificationComponent, NotificationContainerComponent],
  imports: [CommonModule, ButtonsModule],
  exports: [NotificationComponent, NotificationContainerComponent]
})
export class NotificationsModule {}

import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Notification } from '../notification.interface';
import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'rob-notification-container',
  templateUrl: './notification-container.component.html',
  styleUrls: ['./notification-container.component.scss']
})
export class NotificationContainerComponent implements OnInit, OnDestroy {
  public notifications: Notification[];

  private $subscription: Subscription;

  constructor(private readonly notificationsService: NotificationsService) {}

  public ngOnInit(): void {
    this.subscribeToNotifications();
  }

  public ngOnDestroy() {
    if (this.$subscription) {
      this.$subscription.unsubscribe();
    }
  }

  private subscribeToNotifications() {
    this.$subscription = this.notificationsService.$notification.subscribe({
      next: (notification) => this.notifications.push(notification)
    });
  }
}

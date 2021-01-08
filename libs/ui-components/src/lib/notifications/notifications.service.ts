import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Notification } from './notification.interface';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public $notifications: BehaviorSubject<Notification[]> = new BehaviorSubject(
    []
  );

  public add(notification: Notification) {
    this.$notifications.next([...this.$notifications.getValue(), notification]);
  }
}

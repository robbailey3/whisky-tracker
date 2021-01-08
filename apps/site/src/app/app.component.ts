import { Component, OnInit } from '@angular/core';
import {
  NotificationsService,
  Notification
} from '@whisky-tracker/ui-components';

@Component({
  selector: 'rob-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public i = 0;
  constructor(private notificationsService: NotificationsService) {}

  ngOnInit() {
    this.notificationsService.add(
      new Notification('', 'success', false, 5000, true)
    );
  }

  public addNotification() {
    this.notificationsService.add(
      new Notification(String((this.i += 1)), 'success', false, 5000, true)
    );
  }
}

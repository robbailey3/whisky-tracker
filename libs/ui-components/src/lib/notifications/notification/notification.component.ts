import { Component, OnInit, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Notification } from '../notification.interface';

@Component({
  selector: 'rob-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notification;

  public isActive: boolean;

  public faTimes = faTimes;

  public ngOnInit() {
    this.isActive = true;
  }

  public handleClose() {
    this.isActive = false;
  }
}

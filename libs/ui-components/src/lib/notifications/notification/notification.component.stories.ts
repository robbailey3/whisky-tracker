import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonsModule } from '../../buttons/buttons.module';
import { NotificationComponent } from './notification.component';

export default {
  title: 'Notification'
};

export const Notification = (args: NotificationComponent) => ({
  moduleMetadata: {
    imports: [FontAwesomeModule, ButtonsModule]
  },
  component: NotificationComponent,
  props: {
    ...args
  }
});

Notification.args = {
  type: 'success',
  autoDismiss: false,
  autoDismissTimeout: 5000,
  content: 'Content'
} as NotificationComponent;

Notification.argTypes = {
  type: {
    control: {
      type: 'select',
      options: ['success', 'error', 'warning', 'info']
    }
  }
};

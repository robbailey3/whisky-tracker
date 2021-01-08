export interface Notification {
  content: string;
  type: 'success' | 'error' | 'warning' | 'info';
  autoDismiss: boolean;
  autoDismissTimeout: number;
}

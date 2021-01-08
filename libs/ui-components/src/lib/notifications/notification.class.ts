export class Notification {
  constructor(
    public content: string,
    public type: 'success' | 'error' | 'warning' | 'info',
    public autoDismiss: boolean,
    public autoDismissTimeout: number,
    public isActive: boolean
  ) {
    if (this.autoDismissTimeout) {
      setTimeout(() => {
        this.isActive = false;
      }, this.autoDismissTimeout);
    }
  }

  public show() {
    this.isActive = true;
  }

  public hide() {
    this.isActive = false;
  }
}

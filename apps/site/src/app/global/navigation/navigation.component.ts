import {
  Component,
  HostListener,
  Inject,
  AfterViewChecked,
  ViewEncapsulation
} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { WINDOW } from '@ng-toolkit/universal';
import { Subject } from 'rxjs';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'rob-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements AfterViewChecked {
  public isMobile: boolean;

  public $windowSize: Subject<number> = new Subject();

  public state: 'open' | 'closed' = 'closed';

  public faBars = faBars;

  constructor(@Inject(WINDOW) public window: Window) {}

  public ngAfterViewChecked() {
    this.subscribeToWindowSize();
    setTimeout(() => {
      this.handleWindowResize();
    }, 0);
  }

  @HostListener('window:resize')
  public handleWindowResize() {
    this.$windowSize.next(this.window.innerWidth);
  }

  public subscribeToWindowSize() {
    this.$windowSize.pipe(throttleTime(200), distinctUntilChanged()).subscribe({
      next: (size: number) => {
        this.isMobile = size < 768;
      }
    });
  }

  public toggleMenuState() {
    this.state = this.state === 'open' ? 'closed' : 'open';
  }
}

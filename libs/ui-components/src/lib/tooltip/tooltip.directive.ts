import { TooltipComponent } from './tooltip.component';
import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
  Renderer2,
  ViewContainerRef,
  ReflectiveInjector
} from '@angular/core';

@Directive({
  selector: '[robTooltip]'
})
export class TooltipDirective {
  @Input('robTooltip') tooltipText = '';

  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right';

  @Input() delay = 0;

  public timeout: number;

  private componentRef: ComponentRef<TooltipComponent>;

  constructor(
    private readonly el: ElementRef,
    private renderer: Renderer2,
    private resolver: ComponentFactoryResolver,
    private vcr: ViewContainerRef
  ) {}

  @HostListener('mouseover')
  public handleMouseOver($event) {
    this.create();
  }

  @HostListener('mouseleave')
  public handleMouseLeave() {
    clearTimeout(this.timeout);
    if (false) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  private create() {
    console.log(this);
    if (this.componentRef) return;
    setTimeout(() => {
      const factory = this.resolver.resolveComponentFactory(TooltipComponent);
      const injector = Injector.create({
        providers: [
          {
            provide: 'tooltipConfig',
            useValue: {
              host: this.el.nativeElement,
              position: this.tooltipPosition,
              content: this.tooltipText
            }
          }
        ]
      });
      this.componentRef = this.vcr.createComponent(factory, 0, injector);
    }, this.delay);
  }
}

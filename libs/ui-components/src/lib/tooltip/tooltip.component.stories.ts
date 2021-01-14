import { ButtonsModule } from '../buttons/buttons.module';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

export default {
  title: 'Tooltip'
};

export const Tooltip = (args: TooltipDirective) => ({
  moduleMetadata: {
    imports: [ButtonsModule],
    declarations: [TooltipComponent, TooltipDirective]
  },
  template: `<rob-button>Hello World</rob-button>`,
  props: {}
});

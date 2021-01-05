import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonsModule } from '../buttons/buttons.module';
import { ChipComponent } from './chip.component';

export default {
  title: 'ChipComponent'
};

export const primary = (args: ChipComponent) => ({
  moduleMetadata: {
    imports: [FontAwesomeModule, ButtonsModule],
    declarations: [ChipComponent]
  },
  component: ChipComponent,
  props: {
    title: args.title,
    type: args.type,
    dismissable: args.dismissable
  },
  template: `<rob-chip [title]="title" [type]="type" [dismissable]="dismissable">Chip</rob-chip>`
});

primary.args = {
  title: '',
  type: 'sahara-sand',
  dismissable: false
} as ChipComponent;

primary.argTypes = {
  type: {
    control: {
      type: 'select',
      options: [
        'portafino',
        'fire',
        'sahara-sand',
        'glade-green',
        'black-pearl'
      ]
    }
  }
};

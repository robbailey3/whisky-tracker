import { moduleMetadata, Story } from '@storybook/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';

import { action } from '@storybook/addon-actions';

import { ButtonComponent } from './button.component';

export default {
  title: 'Buttons',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      declarations: [ButtonComponent],
      imports: [FontAwesomeModule]
    })
  ]
};

const Template: Story<ButtonComponent> = (
  args: ButtonComponent & { buttonText: string }
) => {
  return {
    component: ButtonComponent,
    props: {
      icon: faAdjust,
      variant: args.variant,
      label: args.label,
      handleClick: () => {
        action('Button clicked');
      },
      href: args.href,
      disabled: args.disabled
    }
  };
};

export const Base: Story<
  ButtonComponent & { buttonText: string }
> = Template.bind({});

Base.args = {
  variant: 'primary',
  label: 'Button',
  href: '',
  disabled: false,
  icon: faAdjust
};
Base.argTypes = {
  variant: {
    control: {
      type: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'ghost']
    }
  },
  icon: {
    control: false
  }
};

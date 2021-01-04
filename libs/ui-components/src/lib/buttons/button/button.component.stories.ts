import { moduleMetadata, Story } from '@storybook/angular';

import { action } from '@storybook/addon-actions';

import { ButtonComponent } from './button.component';

export default {
  title: 'Buttons',
  component: ButtonComponent,
  decorators: [moduleMetadata({ declarations: [ButtonComponent] })]
};

const Template: Story<ButtonComponent> = (
  args: ButtonComponent & { buttonText: string }
) => {
  return {
    component: ButtonComponent,
    props: {
      variant: args.variant,
      buttonText: `${args.variant
        .substring(0, 1)
        .toUpperCase()}${args.variant.slice(1)} Button`,
      handleClick: () => {
        console.log({ action });
        action('Button clicked');
      },
      href: args.href,
      disabled: args.disabled
    },
    template: `<rob-button [variant]="variant" [href]="href" [handleClick]="handleClick" [disabled]="disabled">{{buttonText}}</rob-button>`
  };
};

export const Base: Story<
  ButtonComponent & { buttonText: string }
> = Template.bind({});

Base.args = {
  variant: 'primary',
  href: '',
  disabled: false
};
Base.argTypes = {
  variant: {
    control: {
      type: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger', 'ghost']
    }
  }
};

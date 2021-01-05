import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';

addDecorator(withKnobs);

export const parameters = {
  layout: 'centered',
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#fffffb'
      },
      {
        name: 'dark',
        value: '#000b13'
      }
    ]
  }
};

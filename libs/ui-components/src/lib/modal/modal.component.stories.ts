import { ButtonsModule } from './../buttons/buttons.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { moduleMetadata, Story } from '@storybook/angular';

import { ModalComponent } from './modal.component';

type ModalArgs = ModalComponent & { modalContent: string };

export default {
  title: 'Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      declarations: [ModalComponent],
      imports: [FontAwesomeModule, ButtonsModule]
    })
  ]
};

const Template: Story<ModalComponent> = (args: ModalArgs) => {
  console.log({ args });
  return {
    component: ModalComponent,
    props: { state: args.state, modalContent: args.modalContent },
    template: `<rob-modal [state]="state"><div [innerHTML]="modalContent" style="padding: 2rem"></div></rob-modal>`
  };
};

export const Base: Story<ModalArgs> = Template.bind({});

Base.args = {
  state: 'open',
  modalContent: `<h1>Title</h1>`
};

Base.argTypes = {
  state: {
    control: {
      type: 'select',
      options: ['open', 'closed']
    }
  }
};

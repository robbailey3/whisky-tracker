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
  return {
    component: ModalComponent,
    props: { isActive: args.isActive, modalContent: args.modalContent },
    template: `<rob-modal [isActive]="isActive"><div [innerHTML]="modalContent" style="padding: 2rem"></div></rob-modal>`
  };
};

export const Base: Story<ModalArgs> = Template.bind({});

Base.args = {
  isActive: true,
  modalContent: `<h1>Title</h1>`
};

Base.argTypes = { modalContent: {} };

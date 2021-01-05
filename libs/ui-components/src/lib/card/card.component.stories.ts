import { CardComponent } from './card.component';

export default {
  title: 'Card'
};

export const primary = (args: { content: string }) => ({
  moduleMetadata: {
    declarations: [CardComponent]
  },
  component: CardComponent,
  props: {
    content: args.content
  },
  template: `<rob-card><div [innerHTML]="content"></div></rob-card>`
});

primary.args = {
  content: `<p>Card Component</p>`
};

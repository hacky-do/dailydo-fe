import type { Meta, StoryObj } from '@storybook/nextjs';

import { UnderlineButton } from './underline-button';

const meta: Meta<typeof UnderlineButton> = {
  title: 'Shared/Button/Underline',
  component: UnderlineButton,
  args: {
    children: 'UnderlineButton',
  },
  argTypes: {
    color: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
  },
};

export default meta;
type Story = StoryObj<typeof UnderlineButton>;

export const Default: Story = {
  args: { color: 'primary' },
};

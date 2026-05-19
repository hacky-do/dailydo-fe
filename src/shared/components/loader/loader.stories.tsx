import type { Meta, StoryObj } from '@storybook/nextjs';

import { Loader } from './loader';

const meta: Meta<typeof Loader> = {
  title: 'Shared/Loader',
  component: Loader,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      options: ['sm', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'sm' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'lg' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'lg' },
};

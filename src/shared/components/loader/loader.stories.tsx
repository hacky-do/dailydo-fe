import type { Meta, StoryObj } from '@storybook/nextjs';

import { Loader } from './loader';

const meta: Meta<typeof Loader> = {
  title: 'Shared/Loader',
  component: Loader,
  argTypes: {
    color: { control: false },
    size: { control: 'inline-radio', options: ['sm', 'lg'] },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Primary: Story = {
  args: { color: 'primary', size: 'lg' },
};

export const Secondary: Story = {
  args: { color: 'secondary', size: 'lg' },
};

export const Tertiary: Story = {
  args: { color: 'tertiary', size: 'lg' },
};

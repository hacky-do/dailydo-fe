import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  args: {
    children: 'Button',
    type: 'button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'ghost'],
    },
    size: { options: ['sm', 'lg'] },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', children: 'Outlined' },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};

export const PrimaryLoading: Story = {
  args: { variant: 'primary', isLoading: true },
};

export const SecondaryLoading: Story = {
  args: { variant: 'secondary', isLoading: true },
};

export const OutlinedLoading: Story = {
  args: { variant: 'outlined', isLoading: true },
};

export const WithLoadingInteraction: Story = {
  args: { variant: 'primary', children: 'Submit', size: 'sm' },
  render: (args) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    };

    return <Button {...args} isLoading={isLoading} onClick={handleClick} />;
  },
};

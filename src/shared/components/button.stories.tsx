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

const withLoading = (story: Story): Story => ({
  ...story,
  render: (args) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    };

    return <Button {...args} isLoading={isLoading} onClick={handleClick} />;
  },
});

export const Primary: Story = withLoading({
  args: { variant: 'primary', children: 'Primary', size: 'lg' },
});

export const Secondary: Story = withLoading({
  args: { variant: 'secondary', children: 'Secondary', size: 'sm' },
});

export const Outlined: Story = withLoading({
  args: { variant: 'outlined', children: 'Outlined', size: 'sm' },
});

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled', size: 'lg' },
};

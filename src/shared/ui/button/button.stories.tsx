import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button/Default',
  component: Button,
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: { control: false },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    isLoading: { control: false },
    disabled: { control: 'inline-radio', options: [true, false] },
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
  args: { variant: 'primary', size: 'lg', disabled: false },
});

export const Secondary: Story = withLoading({
  args: { variant: 'secondary', size: 'lg', disabled: false },
});

export const Tertiary: Story = withLoading({
  args: { variant: 'tertiary', size: 'lg', disabled: false },
});

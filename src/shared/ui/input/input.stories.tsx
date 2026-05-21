import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input/Input',
  component: Input,
  args: {
    placeholder: 'Input text',
    description: 'Description',
  },
  argTypes: {
    isError: { control: 'inline-radio', options: [true, false] },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    variant: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Large: Story = {
  args: { variant: 'lg', isError: false },
};

export const Small: Story = {
  args: { variant: 'sm', isError: false },
};

export const Interactive: Story = {
  args: {
    variant: 'lg',
    description: '최대 8글자까지 입력 가능해요.',
    placeholder: '텍스트를 입력해주세요',
    type: 'text',
  },
  argTypes: {
    placeholder: { table: { disable: true } },
    description: { table: { disable: true } },
    type: { table: { disable: true } },
    isError: { table: { disable: true } },
  },
  render: (args) => {
    const [value, setValue] = useState('');

    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        isError={value.length > 8}
      />
    );
  },
};

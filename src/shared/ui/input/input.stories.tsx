import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input/Input',
  component: Input,
  args: {
    label: 'Label',
    placeholder: 'Input text',
    description: 'Description',
    hideLabel: false,
    isError: false,
  },
  argTypes: {
    hideLabel: { control: 'boolean' },
    isError: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    id: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => <Input {...args} id="input-large" />,
};

export const Interactive: Story = {
  args: {
    label: '닉네임',
    description: '최대 8글자까지 입력 가능해요.',
    placeholder: '닉네임을 입력해주세요',
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
        id="input-interactive"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        isError={value.length > 8}
      />
    );
  },
};

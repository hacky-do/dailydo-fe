import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Shared/Input/Textarea',
  component: Textarea,
  args: {
    placeholder: 'Input text',
    description: 'Description',
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};

export const Interactive: Story = {
  args: {
    placeholder: '최대 100자까지 입력 가능해요',
  },
  argTypes: {
    placeholder: { table: { disable: true } },
    description: { table: { disable: true } },
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const MAX = 100;

    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={MAX}
        description={`${value.length}/${MAX}자`}
      />
    );
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Shared/Input/Textarea',
  component: Textarea,
  args: {
    label: 'Label',
    placeholder: 'Input text',
    description: 'Description',
    hideLabel: false,
  },
  argTypes: {
    hideLabel: { control: 'boolean' },
    resizable: { table: { disable: true } },
    id: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => (
    <Textarea hideLabel={false} {...args} id="textarea-default" />
  ),
};

export const Interactive: Story = {
  args: {
    label: '오늘을 한 줄로 남겨볼까요?',
    placeholder: '최대 100자까지 입력 가능해요',
  },
  argTypes: {
    label: { table: { disable: true } },
    placeholder: { table: { disable: true } },
    description: { table: { disable: true } },
  },
  render: (args) => {
    const [value, setValue] = useState('');
    const MAX = 100;

    return (
      <Textarea
        {...args}
        id="textarea-interactive"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={MAX}
        description={`${value.length}/${MAX}자`}
      />
    );
  },
};

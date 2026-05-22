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
  argTypes: {
    id: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  render: (args) => (
    <div className="w-full">
      <label className="sr-only" htmlFor="textarea-default">
        Label
      </label>
      <Textarea {...args} id="textarea-default" />
    </div>
  ),
};

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
      <div className="w-full">
        <label className="sr-only" htmlFor="textarea-interactive">
          Label
        </label>
        <Textarea
          {...args}
          id="textarea-interactive"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={MAX}
          description={`${value.length}/${MAX}자`}
        />
      </div>
    );
  },
};

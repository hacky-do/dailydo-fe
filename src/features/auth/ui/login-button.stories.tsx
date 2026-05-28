import type { Meta, StoryObj } from '@storybook/nextjs';

import { LoginButton } from './login-button';

const meta: Meta<typeof LoginButton> = {
  title: 'Features/Auth/LoginButton',
  component: LoginButton,
  decorators: [
    (Story) => (
      <div className="w-90 p-6">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: { control: 'inline-radio', options: ['google', 'naver', 'guest'] },
  },
};

export default meta;
type Story = StoryObj<typeof LoginButton>;

export const Google: Story = {
  args: { type: 'google' },
};

export const Naver: Story = {
  args: { type: 'naver' },
};

export const Guest: Story = {
  args: { type: 'guest' },
};

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <LoginButton type="google" />
      <LoginButton type="naver" />
      <LoginButton type="guest" />
    </div>
  ),
};

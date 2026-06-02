import type { Meta, StoryObj } from '@storybook/nextjs';

import { ToastProvider } from '@/shared/ui/toast';

import { MobileHeader } from './mobile-header';
import { Sidebar } from './sidebar';

const meta: Meta<typeof MobileHeader> = {
  title: 'Widgets/Header/MobileHeader',
  component: MobileHeader,
  argTypes: {
    className: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="relative h-screen w-full">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MobileHeader>;

export const Default: Story = {
  render: () => (
    <>
      <MobileHeader variant="500" />
    </>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/mypage',
      },
    },
  },
};

export const SidebarLoggedIn: Story = {
  render: () => (
    <>
      <MobileHeader variant="500" />
      <Sidebar isLoggedIn />
    </>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/mylogs',
      },
    },
  },
};

export const SidebarLoggedOut: Story = {
  render: () => (
    <>
      <MobileHeader variant="100" />
      <Sidebar isLoggedIn={false} />
    </>
  ),
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/missions',
      },
    },
  },
};

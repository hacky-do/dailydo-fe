import type { Meta, StoryObj } from '@storybook/nextjs';

import { ToastProvider } from '@/shared/ui/toast';

import { MobileHeader } from './mobile-header';
import { PcHeader } from './pc-header';
import { Sidebar } from './sidebar';

const meta: Meta<typeof PcHeader> = {
  title: 'Widgets/Header/PcHeader',
  component: PcHeader,
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="relative h-screen w-full">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PcHeader>;

export const Default: Story = {
  render: () => (
    <>
      <PcHeader className="hidden md:block" />
      <MobileHeader className="md:hidden" />
    </>
  ),
};

export const WithSidebar: Story = {
  render: () => (
    <>
      <PcHeader className="hidden md:block" />
      <MobileHeader className="md:hidden" />
      <Sidebar isLoggedIn />
    </>
  ),
};

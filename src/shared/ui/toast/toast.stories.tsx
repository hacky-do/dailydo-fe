import type { Meta, StoryObj } from '@storybook/nextjs';

import { Toast } from './toast';
import { ToastProvider, useToast } from './toast-provider';
import type { ToastType } from './toast.types';

const meta: Meta<typeof Toast> = {
  title: 'Shared/Toast',
  component: Toast,
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['success', 'error', 'info', 'warning'],
    },
    isExiting: { control: 'boolean' },
    message: { control: 'text' },
  },
  args: {
    id: 'story-1',
    message: '환영해요! 오늘의 미션을 시작해볼까요?',
    type: 'success',
    isExiting: false,
    onClose: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    type: 'success',
    message: '미션 완료! 마이로그 작성이 완료되었어요.',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: '로그인에 실패했습니다.',
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    message: '미션 완료를 취소했어요.',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    message: '오늘의 미션을 최대 3개까지만 등록할 수 있어요.',
  },
};

// ─────────────────────────────────────────────
// Provider 플레이그라운드
// ─────────────────────────────────────────────

const MESSAGES: Record<ToastType, string> = {
  success: '미션 완료! 마이로그 작성이 완료되었어요.',
  error: '로그인에 실패했습니다.',
  info: '미션 완료를 취소했어요.',
  warning: '오늘의 미션을 최대 3개까지만 등록할 수 있어요.',
};

const TYPE_LABEL: Record<ToastType, string> = {
  success: 'Success',
  error: 'Error',
  info: 'Info',
  warning: 'Warning',
};

function Playground() {
  const { toast } = useToast();

  return (
    <div className="flex flex-col gap-2">
      {(Object.keys(MESSAGES) as ToastType[]).map((type) => (
        <button
          key={type}
          onClick={() => toast({ message: MESSAGES[type], type })}
          className="rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-600"
        >
          {TYPE_LABEL[type]} 토스트 발생
        </button>
      ))}
    </div>
  );
}

export const WithProvider: Story = {
  name: 'Playground (Provider)',
  render: () => (
    <ToastProvider>
      <Playground />
    </ToastProvider>
  ),
};

import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

import { Button } from '../button';
import PictureIcon from '../icons/common/picture.svg';
import { Textarea } from '../input';
import { AlertBottomSheet } from './alert-bottom-sheet';
import { BottomSheet } from './bottom-sheet';
import { FullBottomSheet } from './full-bottom-sheet';

const meta: Meta = {
  title: 'Shared/BottomSheet',
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  name: '기본 (가변 높이)',
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <BottomSheet.Root open={open} onOpenChange={setOpen}>
        <BottomSheet.Trigger>
          <Button size="md">바텀 시트 열기</Button>
        </BottomSheet.Trigger>
        <BottomSheet.Content>
          <BottomSheet.Header>
            <BottomSheet.Title>마이로그 작성</BottomSheet.Title>
            <BottomSheet.Description>
              기억하고 싶은 순간이 있나요?
            </BottomSheet.Description>
          </BottomSheet.Header>
          <BottomSheet.Body>
            <div className="pb-12">
              <div className="flex h-[114px] w-[114px] items-center justify-center rounded-xl bg-gray-50">
                <div className="p-3">
                  <PictureIcon className="h-full w-full" />
                </div>
              </div>
            </div>
            <div className="pb-8">
              <Textarea
                id="mylog"
                label="오늘을 한줄로 남겨 볼까요?"
                placeholder="최대 100자까지 입력 가능해요."
                description="0/100자"
              />
            </div>
          </BottomSheet.Body>
          <BottomSheet.Footer>
            <div className="flex gap-2">
              <BottomSheet.Close>
                <Button variant="secondary">건너뛰기</Button>
              </BottomSheet.Close>
              <BottomSheet.Close>
                <Button variant="primary">완료하기</Button>
              </BottomSheet.Close>
            </div>
          </BottomSheet.Footer>
        </BottomSheet.Content>
      </BottomSheet.Root>
    );
  },
};

export const Full: Story = {
  name: '풀 바텀 시트',
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <FullBottomSheet.Root open={open} onOpenChange={setOpen}>
        <FullBottomSheet.Trigger>
          <Button size="md">풀 바텀 시트 열기</Button>
        </FullBottomSheet.Trigger>
        <FullBottomSheet.Content>
          <FullBottomSheet.Header>
            <FullBottomSheet.Title>풀 바텀 시트</FullBottomSheet.Title>
            <FullBottomSheet.Description>
              화면 대부분을 차지하는 바텀 시트입니다.
            </FullBottomSheet.Description>
          </FullBottomSheet.Header>
          <FullBottomSheet.Body>
            <ul className="space-y-3 pb-2">
              {Array.from({ length: 20 }, (_, i) => (
                <li
                  key={i}
                  className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-700"
                >
                  리스트 아이템 {i + 1}
                </li>
              ))}
            </ul>
          </FullBottomSheet.Body>
          <FullBottomSheet.Footer>
            <FullBottomSheet.Close>
              <Button>닫기</Button>
            </FullBottomSheet.Close>
          </FullBottomSheet.Footer>
        </FullBottomSheet.Content>
      </FullBottomSheet.Root>
    );
  },
};

export const Alert: Story = {
  name: 'Alert (완료/취소)',
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button size="md" onClick={() => setOpen(true)}>
          Alert 바텀 시트 열기
        </Button>
        <AlertBottomSheet
          open={open}
          onOpenChange={setOpen}
          title="정말 취소하시겠어요?"
          description="완료를 취소하면 연결된 로그도 같이 삭제돼요."
          confirmLabel="네"
          cancelLabel="아니오"
          onConfirm={() => setOpen(false)}
        />
      </div>
    );
  },
};

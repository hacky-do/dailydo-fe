'use client';

import { Button } from '@/shared/ui/button';

const Error = () => {
  return (
    <div>
      <span>
        페이지를 불러오는 중 문제가 생겼어요.
        <br /> 잠시 후 다시 시도해 주세요.
      </span>
      <Button variant="tertiary">다시시도</Button>
    </div>
  );
};

export default Error;

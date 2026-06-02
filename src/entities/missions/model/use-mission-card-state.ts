import { useState } from 'react';

export const useMissionCardState = () => {
  const [clicked, setClicked] = useState(false);

  const click = () => setClicked(true);
  const cancel = () => setClicked(false);

  return { clicked, click, cancel };
};

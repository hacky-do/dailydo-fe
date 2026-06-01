import { useState } from 'react';

export const useMissionCardState = () => {
  const [selected, setSelected] = useState(false);

  const select = () => setSelected(true);
  const cancel = () => setSelected(false);

  return { selected, select, cancel };
};

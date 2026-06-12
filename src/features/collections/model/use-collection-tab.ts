'use client';

import { useState } from 'react';

export const useCollectionTab = (initialId = 1) => {
  const [selectedId, setSelectedId] = useState(initialId);
  return { selectedId, setSelectedId };
};

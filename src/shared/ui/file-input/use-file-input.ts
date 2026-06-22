import { useState } from 'react';

export const useFileInput = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (selected: File | null) => {
    setFile(selected);
  };

  return { file, handleChange };
};

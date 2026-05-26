import { useState } from 'react';

/**
 * @example
 * const { file, handleChange } = useFileInput();
 *
 * <FileInput onChange={handleChange} />
 */
export const useFileInput = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (selected: File | null) => {
    setFile(selected);
  };

  return { file, handleChange };
};

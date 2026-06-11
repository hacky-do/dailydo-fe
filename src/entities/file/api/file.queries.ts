import { useMutation } from '@tanstack/react-query';

import { uploadFile } from './file.api';

export const useFileUpload = () =>
  useMutation({
    mutationFn: (file: File) => uploadFile(file),
  });

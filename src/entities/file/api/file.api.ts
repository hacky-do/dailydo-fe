import { FileType } from '@/entities/file/model/file.types';
import { clientApi } from '@/shared/api/fetch-client';

const getPresignedUrl = (mimeType: string) =>
  clientApi.get<FileType>(
    `/files/upload?mimeType=${encodeURIComponent(mimeType)}`,
  );

export const uploadFile = async (file: File): Promise<string> => {
  const { url, path, fields } = await getPresignedUrl(file.type);

  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
  formData.append('file', file);

  await fetch(url, { method: 'POST', body: formData });

  return path;
};

import imageCompression from 'browser-image-compression';

import { FileType } from '@/entities/file/model/file.types';
import { clientApi } from '@/shared/api/fetch-client';

const getPresignedUrl = (mimeType: string) =>
  clientApi.get<FileType>(
    `/files/upload?mimeType=${encodeURIComponent(mimeType)}`,
  );

export const uploadFile = async (file: File): Promise<string> => {
  let CompressionFile = file;
  console.log(file);
  if (file.size > 2 * 1024 * 1024) {
    CompressionFile = await imageCompression(file, {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
    });
  }

  console.log(CompressionFile);

  const { url, path, fields } = await getPresignedUrl(file.type);

  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => formData.append(key, value));
  formData.append('file', CompressionFile);

  const res = await fetch(url, { method: 'POST', body: formData });
  if (!res.ok) {
    const text = await res.text();
    console.error('[S3 upload failed]', res.status, text);
    throw new Error(`S3 upload failed: ${res.status}`);
  }

  return `${url.replace(/\/$/, '')}/${path}`;
};

import Image from 'next/image';
import { useRef, useState } from 'react';

import DeleteFill from '@/shared/ui/icons/common/delete_fill.svg';
import ImagePlus from '@/shared/ui/icons/common/image_plus.svg';
import { useToast } from '@/shared/ui/toast';

interface FileInputProps {
  initialSrc?: string | null;
  onChange?: (file: File | null) => void;
}

export const FileInput = ({ initialSrc, onChange }: FileInputProps) => {
  const [preview, setPreview] = useState<string | null>(initialSrc ?? null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // 이전 URL
  const prevPreviewRef = useRef<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const allowedTypes = [
      'image/png',
      'image/jpeg',
      'image/webp',
      'image/heic',
      'image/heif',
    ];
    if (!allowedTypes.includes(selected.type)) {
      toast({ type: 'info', message: '지원되지 않는 파일 형식입니다.' });
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      toast({ type: 'info', message: '사진 용량은 10MB를 넘을 수 없습니다.' });
      return;
    }

    // 이전 URL 해제
    if (prevPreviewRef.current) URL.revokeObjectURL(prevPreviewRef.current);

    const url = URL.createObjectURL(selected);
    prevPreviewRef.current = url;
    setPreview(url);
    onChange?.(selected);
  };

  const handleDelete = () => {
    if (prevPreviewRef.current) {
      URL.revokeObjectURL(prevPreviewRef.current);
      prevPreviewRef.current = null;
    }

    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
    onChange?.(null);
  };

  const previewImage = preview ? (
    <Image
      src={preview}
      alt="첨부 사진 미리보기"
      fill
      unoptimized
      className="object-cover"
    />
  ) : null;

  return (
    <div className="relative size-28.5 rounded-xl">
      <label
        aria-label="사진 첨부"
        className="relative flex size-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-gray-50 p-3 text-gray-500"
      >
        {previewImage ?? (
          <>
            <ImagePlus className="size-4.5" />
            <span className="text-sm">사진 첨부</span>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/heic,image/heif"
          className="sr-only"
          onChange={handleChange}
        />
      </label>
      {preview && (
        <button
          type="button"
          onClick={handleDelete}
          aria-label="첨부 사진 삭제"
          className="absolute top-1 right-1"
        >
          <DeleteFill className="size-4.5" />
        </button>
      )}
    </div>
  );
};
